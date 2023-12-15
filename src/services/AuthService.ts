import { GetConfig, SetConfig } from '../configs';
import { SignInData } from '../types/SignIn.ts';
import axios from 'axios';

const IsAuthorized = () => {
  const config = GetConfig();
  return config.AccessToken !== '';
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
  config.AccessToken = response.access_token;
  config.RefreshToken = response.refresh_token;
  SetConfig(config);

  axios.defaults.headers.common.Authorization = GetAccessTokenHeader();
};

const GetAccessTokenHeader = () => {
  const config = GetConfig();
  return `Bearer ${config.AccessToken}`;
};

export interface AuthService {
  IsAuthorized: () => boolean;
  SignIn: (data: SignInData) => void;
}

export const AuthService: AuthService = {
  IsAuthorized: IsAuthorized,
  SignIn: SignIn,
};
