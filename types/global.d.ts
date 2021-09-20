declare global {

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      ROOT?: string;
      PORT?: string;
      HOST?: string;
      PUBLIC_URL?: string;
      STORAGE_URL?: string;
      DB_TYPE?: string;
      DB_HOST?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
      DB_PORT?: string;
      KEY_PEM?: string;
      CA_PEM?: string;
      CERT_PEM?: string;
    }
  }
}
