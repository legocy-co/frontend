import { GetConfig, SetConfig } from '../configs';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';
import {SignUpData} from "../types/SignUp.ts";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

const IsAuthorized = () => {
  const config = GetConfig();
  return config.accessToken !== '';
};

const Authorize = async (data: SignInData | SignUpData) => {
  const url = `/users/auth/${'username' in data ? 'sign-in' : 'register'}`;

  const response = await axios
    .post<AuthResponse>(url, data)
    .then((response) => response.data);

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

export interface AuthService {
  IsAuthorized: () => boolean;
  Authorize: (data: SignInData | SignUpData) => void;
}

export const AuthService: AuthService = {
  IsAuthorized: IsAuthorized,
  Authorize: Authorize,
};
