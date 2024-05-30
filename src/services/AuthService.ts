import { GetCredentials, SetCredentials } from '../storage/credentials.ts';
import { SignInData, SignUpData } from '../types/authorization.ts';
import axios from 'axios';
import { history } from '../routes/history.ts';
import { handleUserError } from './ErrorHandlers.ts';
import { su } from '../features/auth/sign-up/';
import { si } from '../features/auth/sign-in/';
import { jwtDecode } from 'jwt-decode';
import { auth } from '../pages/auth/';

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
  SignUp: (data: SignUpData) => void;
  RefreshToken: () => void;
  Logout: () => void;
  GetUserId: () => number;
  GetUserEmail: () => string;
  GetAccessTokenHeader: () => string;
}

export interface TokenType {
  id: number;
  email: string;
  role: number;
  exp: number;
}

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
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
    return handleUserError(e, 'SignIn', si.form);
  }
};

const SignUp = async (data: SignUpData) => {
  try {
    const response = await axios
      .post<AuthResponse>('/users/auth/register', data)
      .then((response) => response.data);

    SetAuthHeaders(response);
  } catch (e) {
    return handleUserError(e, 'SignUp', su.form);
  }
};

const RefreshToken = async () => {
  const storage = GetCredentials();
  const response = await axios
    .post<RefreshTokenResponse>('/users/auth/refresh', {
      refreshToken: storage.refreshToken,
    })
    .then((response) => response.data);

  storage.accessToken = response.accessToken;
  SetCredentials(storage);
};

const Logout = () => {
  const storage = GetCredentials();
  storage.accessToken = '';
  storage.refreshToken = '';
  storage.qbID = 0;
  storage.chatToken = '';
  SetCredentials(storage);

  axios.defaults.headers.common.Authorization = '';
  auth.loggedOut();

  history.navigate(`auth/sign-in?from=${history.location?.pathname}`);
};

const GetUserId = () => {
  if (IsAuthorized()) {
    const decodedAccess = decodeAccess();
    return decodedAccess.id;
  }
  return 0;
};

const GetUserEmail = () => {
  if (IsAuthorized()) {
    const decodedAccess = decodeAccess();
    return decodedAccess.email;
  }
  return '';
};

const GetAccessTokenHeader = (): string => {
  const storage = GetCredentials();
  return `Bearer ${storage.accessToken}`;
};

export const authService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
  SignUp: SignUp,
  RefreshToken: RefreshToken,
  Logout: Logout,
  GetUserId: GetUserId,
  GetUserEmail: GetUserEmail,
  GetAccessTokenHeader: GetAccessTokenHeader,
};

const decodeAccess = () => {
  const storage = GetCredentials();
  return jwtDecode<TokenType>(storage.accessToken);
};

const SetAuthHeaders = (response: AuthResponse) => {
  const storage = GetCredentials();
  storage.accessToken = response.accessToken;
  storage.refreshToken = response.refreshToken;
  SetCredentials(storage);

  axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
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
        auth.tokenRefreshed();
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
