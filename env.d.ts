declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    DATABASE_URL: string;
  }
}