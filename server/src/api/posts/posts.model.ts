import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

import schema from './posts.schema.json';

class Posts extends Model {
  static get tableName() {
    return tableNames.posts;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const User = require('../users/users.model');
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
