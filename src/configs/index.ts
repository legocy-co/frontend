const CONFIG_LOCAL_STORAGE_KEY = 'legocy-configs';

type Config = {
  accessToken: string;
  refreshToken: string;
  legoSets: object[];
};

const GetConfig = (): Config => {
  const strConfig = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);

  let config: Config = {
    accessToken: '',
    refreshToken: '',
    legoSets: [],
  };

  if (strConfig) config = JSON.parse(strConfig);
  return config;
};

const SetConfig = (config: Config): void => {
  const strConfig = JSON.stringify(config);
  localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, strConfig);
};

export { GetConfig, SetConfig };
