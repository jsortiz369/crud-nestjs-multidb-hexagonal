export type Env = {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CORS_ORIGIN: string[];
  DB_TYPE: 'postgresql' | 'sqlserver' | 'mysql';
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
};
