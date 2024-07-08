import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';
import GoogleIcon from '../../../assets/icons/google.svg?react';
import FacebookIcon from '../../../assets/icons/facebook.svg?react';
import { auth } from '../../../features/auth';
import { useState } from 'react';
import { FormError } from '../../../shared/ui/form-error.tsx';

export const SocialAuth = () => {
  const [showWarn, setShowWarn] = useState(false);

  function handleSocialResolve({ provider, data }: typeof IResolveParams) {
    if (provider === 'google') {
      auth.googleTokenFetched(data.credential);
      return;
    }
    auth.fbDataFetched(data);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-6">
        <LoginSocialGoogle
          typeResponse="idToken"
          client_id={import.meta.env.VITE_GG_APP_ID}
          onResolve={handleSocialResolve}
          onReject={console.error}
        >
          <div className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90">
            <GoogleIcon />
          </div>
        </LoginSocialGoogle>
        <div
          onClick={() => setShowWarn(true)}
          className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
        >
          <FacebookIcon />
        </div>
      </div>
      {showWarn && (
        <div className="flex justify-center h-10 mt-4">
          <FormError className="!bg-statuswarn !text-[#C5B179] max-w-80">
            Facebook authorization is temporary unavailable
          </FormError>
        </div>
      )}
    </div>
  );
};
