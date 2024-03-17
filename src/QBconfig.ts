export const QBConfig = {
  credentials: {
    appId: import.meta.env.QB_APPLICATION_ID,
    accountKey: import.meta.env.QB_ACCOUNT_KEY,
    authKey: import.meta.env.QB_AUTH_KEY,
    authSecret: import.meta.env.QB_AUTH_SECRET,
    sessionToken: '',
  },
  appConfig: {
    chatProtocol: {
      active: 2,
    },
    debug: true,
    endpoints: {
      api: 'https://api.quickblox.com',
      chat: 'chat.quickblox.com',
    },
    // on: {
    //   async sessionExpired(handleResponse: any, retry: any) {
    //     console.log(`Test sessionExpired… ${handleResponse} ${retry}`);
    //   },
    // },
    streamManagement: {
      enable: true,
    },
  },
};
