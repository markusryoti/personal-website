import { Model } from 'objection';

import tableNames from '../../constants/tableNames';

import schema from './post_images.schema.json';

class PostImages extends Model {
  id?: number;
  image_id?: number;
  post_id?: number;

  static get tableName() {
    return tableNames.post_images;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const Images = require('../images/images.model');
    const Posts = require('../posts/posts.model');

    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: Images,
        join: {
          from: `${tableNames.images}.id`,
          to: `${tableNames.post_images}.image_id`,
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Posts,
        join: {
          from: `${tableNames.posts}.id`,
          to: `${tableNames.post_images}.post_id`,
        },
      },
    };
  }
}

export default PostImages;
