import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

import schema from './users.schema.json';

class Users extends Model {
  id?: number;
  fist_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;

  static get tableName() {
    return tableNames.users;
  }

  static get jsonSchema() {
    return schema;
  }
}

export default Users;
