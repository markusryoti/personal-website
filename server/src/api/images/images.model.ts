import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

class Images extends Model {
  id?: number;
  url?: string;
  user_id?: number;

  static get tableName() {
    return tableNames.images;
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

export default Images;
