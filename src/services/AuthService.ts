import { GetConfig, SetConfig } from '../configs';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';
import { SignUpData } from '../types/SignUp.ts';
import { jwtDecode } from 'jwt-decode';
import { history } from '../routes/history.ts';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type RefreshResponse = {
  accessToken: string;
};

interface TokenType {
  id: number;
  email: string;
  role: number;
  exp: number;
}

const IsAuthorized = () => {
  const config = GetConfig();
  return config.accessToken !== '';
};

const SignIn = async (data: SignInData) => {
  const response = await axios
    .post<AuthResponse>('/users/auth/sign-in', data)
    .then((response) => response.data);

  SetAuthHeaders(response);
};

const SignUp = async (data: SignUpData) => {
  const response = await axios
    .post<AuthResponse>('/users/auth/register', data)
    .then((response) => response.data);

  SetAuthHeaders(response);
};

const RefreshToken = async () => {
  const config = GetConfig();
  const response = await axios
    .post<RefreshResponse>('/users/auth/refresh', {
      refreshToken: config.refreshToken,
    })
    .then((response) => response.data);
  config.accessToken = response.accessToken;
  SetConfig(config);
};

const Logout = () => {
  const config = GetConfig();
  config.accessToken = '';
  config.refreshToken = '';
  SetConfig(config);
};

const SetAuthHeaders = (response: AuthResponse) => {
  const config = GetConfig();
  config.accessToken = response.accessToken;
  config.refreshToken = response.refreshToken;
  SetConfig(config);

  axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
};

const GetAccessTokenHeader = () => {
  const config = GetConfig();
  return `Bearer ${config.accessToken}`;
};

const GetBaseUrl = () => {
  if (import.meta.env.VITE_API_ENDPOINT)
    return import.meta.env.VITE_API_ENDPOINT;
  return '/api/v1';
};

axios.defaults.baseURL = GetBaseUrl();
axios.defaults.headers.common.Authorization = IsAuthorized()
  ? GetAccessTokenHeader()
  : '';

axios.interceptors.request.use(
  async (req) => {
    const config = GetConfig();
    if (config.refreshToken) {
      const decodedRefresh = jwtDecode<TokenType>(config.refreshToken);
      if (Math.floor(Date.now() / 1000) > decodedRefresh.exp - 60) {
        Logout();
        history.navigate(`auth?from=${history.location?.pathname}`);
      }
    }

    return req;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        await RefreshToken();
        axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
      } catch (e) {
        Logout();
        return Promise.reject(error);
      }

      if (error?.config.headers)
        error.config.headers.Authorization = GetAccessTokenHeader();

      return axios(error?.config.headers);
    }

    return Promise.reject(error);
  },
);

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
  SignUp: (data: SignUpData) => void;
  RefreshToken?: () => void;
  Logout: () => void;
}

export const AuthService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
  SignUp: SignUp,
  RefreshToken: RefreshToken,
  Logout: Logout,
};
