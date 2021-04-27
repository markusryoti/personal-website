import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

class Users extends Model {
  static get tableName() {
    return tableNames.users;
  }

  // TODO
  // Add schema
  // static get jsonSchema() {
  //   return schema
  // }
}

export default Users;
