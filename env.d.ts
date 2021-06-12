declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    DATABASE_URL: string;
  }
}