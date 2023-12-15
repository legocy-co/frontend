import { GetConfig, SetConfig } from '../configs';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';

const IsAuthorized = () => {
  const config = GetConfig();
  return config.accessToken !== '';
};

type SignInResponse = {
  access_token: string;
  refresh_token: string;
};

const SignIn = async (data: SignInData) => {
  const url = '/users/auth/sign-in';

  const response = await axios
    .post<SignInResponse>(url, data)
    .then((response) => response.data);

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
  if (import.meta.env.VITE_API_ENDPOINT)
    return import.meta.env.VITE_API_ENDPOINT;
  return '/api/v1';
};

axios.defaults.baseURL = GetBaseUrl();
axios.defaults.headers.common.Authorization = IsAuthorized()
  ? GetAccessTokenHeader()
  : '';

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
}

export const AuthService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
};
