const CONFIG_LOCAL_STORAGE_KEY = 'legocy-configs';

type Config = {
  AccessToken: string;
  RefreshToken: string;
};

const GetConfig = (): Config => {
  const strConfig = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);

  let config: Config = {
    AccessToken: '',
    RefreshToken: '',
  };

  if (strConfig) config = JSON.parse(strConfig);
  return config;
};

const SetConfig = (config: Config): void => {
  const strConfig = JSON.stringify(config);
  localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, strConfig);
};

export { GetConfig, SetConfig };
