import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QB from 'quickblox/quickblox';
import { QBConfig } from '../../QBconfig.ts';
import React, { useEffect } from 'react';
import { cm } from '../ChatPage';
import {
  AuthorizationData,
  qbDataContext,
  QBDataContextType,
} from 'quickblox-react-ui-kit';
import { useGate, useUnit } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { GetCredentials } from '../../storage/credentials.ts';

const RootPage = () => {
  useGate(cm.gate);
  const chatUsername = useUnit(cm.$username);
  const authChatData = useUnit(cm.$authChatData);
  const creds = GetCredentials();
  const authorized = authService.IsAuthorized();
  (!creds.chatToken || !creds.qbID) && authorized && cm.sessionExpired();

  const qbUIKitContext: QBDataContextType = React.useContext(qbDataContext);
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

    const APPLICATION_ID = Number(import.meta.env.VITE_QB_APPLICATION_ID);
    const ACCOUNT_KEY = import.meta.env.VITE_QB_ACCOUNT_KEY;
    const CONFIG = QBConfig.appConfig;

    QB.initWithAppId(APPLICATION_ID, ACCOUNT_KEY, CONFIG);
  };

  useEffect(() => {
    if (!isSDKInitialized && authChatData.token) {
      prepareSDK()
        .then(() => {
          QB.startSessionWithToken(
            authChatData.token,
            async function (errorStartSession: any) {
              if (errorStartSession) {
                errorStartSession.code === 401 && cm.sessionExpired();
                console.log('Start User Session has error:', errorStartSession);
              } else {
                const userId: number = authChatData.qbID;
                const password: string = authChatData.token;
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
                        userName: chatUsername,
                        sessionToken: password,
                      };

                      await qbUIKitContext.authorize(authData);

                      setSDKInitialized(true);
                      cm.chatConnected();
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

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
      <div id="portal_root" />
    </>
  );
};

export default RootPage;
