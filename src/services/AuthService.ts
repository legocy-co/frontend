import { GetCredentials, SetCredentials } from '../storage/credentials.ts';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';
import { SignUpData } from '../types/SignUp.ts';
import { history } from '../routes/history.ts';
import { handleAuthError } from './ErrorHandlers.ts';
import { su } from '../features/auth/sign-up/';
import { si } from '../features/auth/sign-in/';
import { jwtDecode } from 'jwt-decode';
import { auth } from '../pages/auth/';

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
  SignUp: (data: SignUpData) => void;
  RefreshToken?: () => void;
  Logout: () => void;
  GetUserId: () => number;
}

export interface TokenType {
  id: number;
  email: string;
  role: number;
  exp: number;
}

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

type RefreshTokenResponse = {
  access_token: string;
};

const IsAuthorized = () => {
  const storage = GetCredentials();
  return storage.accessToken !== '';
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
  const storage = GetCredentials();
  const response = await axios
    .post<RefreshTokenResponse>('/users/auth/refresh', {
      refresh_token: storage.refreshToken,
    })
    .then((response) => response.data);

  storage.accessToken = response.access_token;
  SetCredentials(storage);

  auth.tokenRefreshed();
};

const Logout = () => {
  const storage = GetCredentials();
  storage.accessToken = '';
  storage.refreshToken = '';
  SetCredentials(storage);

  axios.defaults.headers.common.Authorization = '';
  auth.loggedOut();

  history.navigate(`auth?from=${history.location?.pathname}`);
};

const GetUserId = () => {
  if (IsAuthorized()) {
    const storage = GetCredentials();
    const decodedAccess = jwtDecode<TokenType>(storage.accessToken);
    return decodedAccess.id;
  }
  return 0;
};

export const authService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
  SignUp: SignUp,
  RefreshToken: RefreshToken,
  Logout: Logout,
  GetUserId: GetUserId,
};

const SetAuthHeaders = (response: AuthResponse) => {
  const storage = GetCredentials();
  storage.accessToken = response.access_token;
  storage.refreshToken = response.refresh_token;
  SetCredentials(storage);

  axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
};

const GetAccessTokenHeader = () => {
  const storage = GetCredentials();
  return `Bearer ${storage.accessToken}`;
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
    const storage = GetCredentials();
    if (storage.refreshToken) {
      const decodedRefresh = jwtDecode<TokenType>(storage.refreshToken);

      if (Math.floor(Date.now() / 1000) > decodedRefresh.exp - 60) {
        Logout();
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
  async (err) => {
    if (err?.response?.status === 401) {
      try {
        await RefreshToken();
        axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
      } catch (e) {
        Logout();
        return Promise.reject(err);
      }

      if (err?.config.headers)
        err.config.headers.Authorization = GetAccessTokenHeader();

      return axios(err?.config);
    }

    return Promise.reject(err);
  }
);
