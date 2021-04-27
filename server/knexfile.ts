import dotenv from 'dotenv';
dotenv.config();

interface KnexConfig {
  [key: string]: object;
}

const config: KnexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_DB,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      // This should be created on startup
      host: process.env.POSTGRES_DB,
      database: process.env.POSTGRES_TEST_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

export default config;
