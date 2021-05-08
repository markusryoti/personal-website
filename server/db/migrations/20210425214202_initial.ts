import { Knex } from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableNames.users, table => {
    table.increments().notNullable();
    table.string('email', 254).notNullable().unique();
    table.string('username', 128).notNullable().unique();
    table.string('first_name', 128);
    table.string('last_name', 128);
    table.string('password', 254).notNullable();
    table.dateTime('last_login');
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tableNames.posts, table => {
    table.increments().notNullable();
    table.string('title', 254).notNullable().unique();
    table.string('description', 254);
    table.string('image_url', 512);
    table.json('content').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable(tableNames.users)
      .onDelete('cascade')
      .notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(tableNames.posts);
  await knex.schema.dropTableIfExists(tableNames.users);
}
