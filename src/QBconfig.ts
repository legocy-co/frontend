export const QBConfig = {
  credentials: {
    appId: import.meta.env.VITE_QB_APPLICATION_ID,
    accountKey: import.meta.env.VITE_QB_ACCOUNT_KEY,
    authKey: '',
    authSecret: import.meta.env.VITE_QB_AUTH_SECRET,
    sessionToken: '',
  },
  configAIApi: {
    AIAnswerAssistWidgetConfig: {
      apiKey: '',
      useDefault: false,
      proxyConfig: {
        api: '',
        servername: '',
        port: '',
        sessionToken: '',
      },
      maxTokens: 0,
    },
    AITranslateWidgetConfig: {
      organizationName: 'LEGOcy',
      openAIModel: 'gpt-3.5-turbo',
      apiKey: '',
      useDefault: false,
      maxTokens: 0,
      defaultLanguage: '',
      languages: [],
      proxyConfig: {
        api: '',
        servername: '',
        port: '',
        sessionToken: '',
      },
    },
    AIRephraseWidgetConfig: {
      apiKey: '',
      useDefault: false,
      defaultTone: '',
      proxyConfig: {
        api: '',
        servername: '',
        port: '',
        sessionToken: '',
      },
      maxTokens: 0,
      Tones: [],
    },
  },
  appConfig: {
    maxFileSize: 10 * 1024 * 1024,
    sessionTimeOut: 122,
    chatProtocol: {
      active: 2,
    },
    debug: true,
    enableForwarding: false,
    enableReplying: true,
    endpoints: {
      api: 'api.quickblox.com',
      chat: 'chat.quickblox.com',
    },
    streamManagement: {
      enable: true,
    },
  },
};
