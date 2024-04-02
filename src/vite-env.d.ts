/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_QB_APPLICATION_ID: number;
  readonly VITE_QB_AUTH_KEY: string;
  readonly VITE_QB_AUTH_SECRET: string;
  readonly VITE_QB_ACCOUNT_KEY: string;
  readonly VITE_QB_REGISTERED_USER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
