import {
  AuthorizationData,
  qbDataContext,
  QBDataContextType,
  QuickBloxUIKitDesktopLayout,
  QuickBloxUIKitProvider,
} from 'quickblox-react-ui-kit';
import { QBConfig } from '../../QBconfig';
import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import React, { useEffect } from 'react';
import QB from 'quickblox/quickblox';
import CustomTheme from './CustomTheme.ts';

const ChatPage = () => {
  useGate(model.gate);

  const currentUser = useUnit(model.$currentUser);
  const authChatData = useUnit(model.$authChatData);

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
    if (!isSDKInitialized && currentUser.login) {
      prepareSDK()
        .then(() => {
          QB.startSessionWithToken(
            authChatData.token,
            async function (errorStartSession: any) {
              if (errorStartSession) {
                console.log(
                  'Start User Session has error:',
                  JSON.stringify(errorStartSession)
                );
              } else {
                const userId: number = authChatData.qbID;
                const password: string = authChatData.token;
                const paramsConnect = { userId, password };

                QB.chat.onSessionExpiredListener = function () {
                  model.tokenExpired();
                };

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
                        sessionToken: password,
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
  }, [authChatData.token]);

  // useEffect(() => {
  //   if (!isSDKInitialized && currentUser.login) {
  //     prepareSDK()
  //       .then(() => {
  //         QB.createSession(
  //           currentUser,
  //           async function (errorCreateSession: any, session: any) {
  //             if (errorCreateSession) {
  //               console.log(
  //                 'Create User Session has error:',
  //                 JSON.stringify(errorCreateSession)
  //               );
  //             } else {
  //               const userId: number = session.user_id;
  //               const password: string = session.token;
  //               const paramsConnect = { userId, password };
  //
  //               QB.chat.connect(
  //                 paramsConnect,
  //                 async function (errorConnect: any) {
  //                   if (errorConnect) {
  //                     console.log(
  //                       'Can not connect to chat server: ',
  //                       errorConnect
  //                     );
  //                   } else {
  //                     const authData: AuthorizationData = {
  //                       userId: userId,
  //                       password: password,
  //                       userName: currentUser.login,
  //                       sessionToken: session.token,
  //                     };
  //
  //                     await qbUIKitContext.authorize(authData);
  //
  //                     setSDKInitialized(true);
  //                     setUserAuthorized(true);
  //                   }
  //                 }
  //               );
  //             }
  //           }
  //         );
  //       })
  //       .catch((e) => {
  //         console.log('init SDK has error: ', e);
  //       });
  //   }
  // }, [currentUser.login]);

  return (
    <div className="w-screen flex flex-col justify-between">
      <QuickBloxUIKitProvider
        qbConfig={{ ...QBConfig }}
        maxFileSize={100 * 1000000}
        accountData={{ ...QBConfig.credentials }}
        // loginData={{
        //   login: currentUser.login,
        //   password: currentUser.password,
        // }}
      >
        <div className="absolute top-[90px] w-full">
          {
            // React states indicating the ability to render UI
            isSDKInitialized && isUserAuthorized ? (
              <QuickBloxUIKitDesktopLayout
                uikitHeightOffset={`155px`}
                theme={new CustomTheme()}
              />
            ) : (
              <div className="text-center mt-10">initializing messenger...</div>
            )
          }
        </div>
        <div className="h-[155px]"></div>
      </QuickBloxUIKitProvider>
    </div>
  );
};

export default ChatPage;
