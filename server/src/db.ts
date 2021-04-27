import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';

export default function () {
  console.log('Setting up database');

  const environment = process.env.NODE_ENV || 'development';

  const connectionConfig = knexConfig[environment];
  const connection = knex(connectionConfig);

  Model.knex(connection);

  console.log('Database setup');
}
