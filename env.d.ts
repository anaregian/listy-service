declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_ROOT_PASSWORD: string;
    DATABASE_URL: string;
  }
}
