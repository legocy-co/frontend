import {
  AuthorizationData,
  LoginData,
  qbDataContext,
  QBDataContextType,
  QuickBloxUIKitDesktopLayout,
  QuickBloxUIKitProvider,
} from 'quickblox-react-ui-kit';
import { QBConfig } from '../../QBconfig';
import { useGate } from 'effector-react';
import * as model from './model';
import React, { useEffect } from 'react';
import QB from 'quickblox/quickblox';

const MessengerPage = () => {
  useGate(model.gate);

  const currentUser: LoginData = {
    login: 'wjojf',
    password: import.meta.env.VITE_QB_REGISTERED_USER_PASSWORD,
  };

  const qbUIKitContext: QBDataContextType = React.useContext(qbDataContext);

  const [isUserAuthorized, setUserAuthorized] = React.useState(false);
  const [isSDKInitialized, setSDKInitialized] = React.useState(false);

  const prepareSDK = async (): Promise<void> => {
    // check if we have installed SDK
    if ((window as any).QB === undefined) {
      if (QB !== undefined) {
        (window as any).QB = QB;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const QBLib = require('quickblox/quickblox.min');
        (window as any).QB = QBLib;
      }
    }

    const APPLICATION_ID = QBConfig.credentials.appId;
    const AUTH_KEY = QBConfig.credentials.authKey;
    const AUTH_SECRET = QBConfig.credentials.authSecret;
    const ACCOUNT_KEY = QBConfig.credentials.accountKey;
    const CONFIG = QBConfig.appConfig;

    QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);
  };

  useEffect(() => {
    if (!isSDKInitialized) {
      prepareSDK()
        .then(() => {
          QB.createSession(
            currentUser,
            async function (errorCreateSession: any, session: any) {
              if (errorCreateSession) {
                console.log(
                  'Create User Session has error:',
                  JSON.stringify(errorCreateSession)
                );
              } else {
                const userId: number = session.user_id;

                const password: string = session.token;
                const paramsConnect = { userId, password };

                QB.chat.connect(
                  paramsConnect,
                  async function (errorConnect: any) {
                    if (errorConnect) {
                      console.log(
                        'Can not connect to chat server: ',
                        errorConnect
                      );
                    } else {
                      const authData: AuthorizationData = {
                        userId: userId,
                        password: password,
                        userName: currentUser.login,
                        sessionToken: session.token,
                      };

                      await qbUIKitContext.authorize(authData);
                      setSDKInitialized(true);

                      setUserAuthorized(true);
                    }
                  }
                );
              }
            }
          );
        })
        .catch((e) => {
          console.log('init SDK has error: ', e);
        });
    }
  }, []);

  return (
    <div>
      <QuickBloxUIKitProvider
        qbConfig={{ ...QBConfig }}
        maxFileSize={100 * 1000000}
        accountData={{ ...QBConfig.credentials }}
        loginData={{
          login: currentUser.login,
          password: currentUser.password,
        }}
      >
        <div className="w-full h-full flex flex-col justify-center">
          {
            // React states indicating the ability to render UI
            isSDKInitialized && isUserAuthorized ? (
              <QuickBloxUIKitDesktopLayout uikitHeightOffset="32px" />
            ) : (
              <div>wait while SDK is initializing...</div>
            )
          }
        </div>
      </QuickBloxUIKitProvider>
    </div>
  );
};

export default MessengerPage;
