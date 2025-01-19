declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_URL: string;
    CODE?: string;
  }
} 