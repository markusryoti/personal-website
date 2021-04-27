import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

import schema from './users.schema.json';

class Users extends Model {
  id?: number;
  name?: string;
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
