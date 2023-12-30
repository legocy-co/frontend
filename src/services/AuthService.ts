import { GetConfig, SetConfig } from '../configs';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';
import { SignUpData } from '../types/SignUp.ts';
import { jwtDecode } from 'jwt-decode';
import { history } from '../routes/history.ts';
import * as si from '../features/sign-in/model';
import * as su from '../features/sign-up/model';
import { handleAuthError } from './ErrorHandlers.ts';

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
  SignUp: (data: SignUpData) => void;
  RefreshToken?: () => void;
  Logout: () => void;
}

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

type RefreshTokenResponse = {
  access_token: string;
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
  try {
    const response = await axios
      .post<AuthResponse>('/users/auth/sign-in', data)
      .then((response) => response.data);

    SetAuthHeaders(response);
  } catch (e) {
    return handleAuthError(e, 'SignIn', si.form);
  }
};

const SignUp = async (data: SignUpData) => {
  try {
    const response = await axios
      .post<AuthResponse>('/users/auth/register', data)
      .then((response) => response.data);

    SetAuthHeaders(response);
  } catch (e) {
    return handleAuthError(e, 'SignUp', su.form);
  }
};

const RefreshToken = async () => {
  const config = GetConfig();
  const response = await axios
    .post<RefreshTokenResponse>('/users/auth/refresh', {
      refresh_token: config.refreshToken,
    })
    .then((response) => response.data);

  config.accessToken = response.access_token;
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
  config.accessToken = response.access_token;
  config.refreshToken = response.refresh_token;
  SetConfig(config);

  axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
};

const GetAccessTokenHeader = () => {
  const config = GetConfig();
  return `Bearer ${config.accessToken}`;
};

const GetBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT;
  if (baseUrl) return baseUrl;
  return '/api/v1';
};

axios.defaults.baseURL = GetBaseUrl();
axios.defaults.headers.common.Authorization = IsAuthorized()
  ? GetAccessTokenHeader()
  : '';

axios.interceptors.request.use(
  async (request) => {
    const config = GetConfig();
    if (config.refreshToken) {
      const decodedRefresh = jwtDecode<TokenType>(config.refreshToken);
      if (Math.floor(Date.now() / 1000) > decodedRefresh.exp - 60) {
        Logout();
        history.navigate(`auth?from=${history.location?.pathname}`);
      }
    }

    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
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

      return axios(error?.config);
    }

    return Promise.reject(error);
  }
);

export const AuthService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
  SignUp: SignUp,
  RefreshToken: RefreshToken,
  Logout: Logout,
};
