import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

class Posts extends Model {
  static get tableName() {
    return tableNames.posts;
  }

  // TODO
  // Add schema
  // static get jsonSchema() {
  //   return schema
  // }

  static get relationMappings() {
    const User = require('../users/users.models');
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${tableNames.users}.id`,
          to: `${tableNames.posts}.user_id`,
        },
      },
    };
  }
}

export default Posts;
