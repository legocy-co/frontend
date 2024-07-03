import {
  IResolveParams,
  LoginSocialFacebook,
  LoginSocialGoogle,
} from 'reactjs-social-login';
import GoogleIcon from '../../../assets/icons/google.svg?react';
import FacebookIcon from '../../../assets/icons/facebook.svg?react';
import { auth } from '../../../features/auth';

export const SocialAuth = () => {
  function handleSocialResolve({ provider, data }: typeof IResolveParams) {
    if (provider === 'google') {
      auth.googleTokenFetched(data.credential);
      return;
    }
    auth.fbDataFetched(data);
  }

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90">
        <LoginSocialGoogle
          typeResponse="idToken"
          client_id={import.meta.env.VITE_GG_APP_ID}
          onResolve={handleSocialResolve}
          onReject={console.error}
        >
          <GoogleIcon />
        </LoginSocialGoogle>
      </div>
      <div className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90">
        <LoginSocialFacebook
          appId={import.meta.env.VITE_FB_APP_ID}
          onResolve={handleSocialResolve}
          onReject={console.error}
        >
          <FacebookIcon />
        </LoginSocialFacebook>
      </div>
    </div>
  );
};
