declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WORDPRESS_API_URL: string;
      WORDPRESS_AUTH_USERNAME: string;
      WORDPRESS_AUTH_PASSWORD: string;
      WORDPRESS_GRAPHQL_URL?: string;
      REVALIDATE_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};

