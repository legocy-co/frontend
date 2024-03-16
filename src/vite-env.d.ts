/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly QB_APPLICATION_ID: number;
  readonly QB_AUTH_KEY: string;
  readonly QB_AUTH_SECRET: string;
  readonly QB_ACCOUNT_KEY: string;
  readonly QB_LOGIN_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
