import { Knex } from 'knex';
import axios from 'axios';
import tableNames from '../../src/constants/tableNames';

export async function seed(knex: Knex): Promise<void> {
  //   // Deletes ALL existing entries
  //   await knex('table_name').del();

  //   // Inserts seed entries
  //   await knex('table_name').insert([
  //     { id: 1, colName: 'rowValue1' },
  //     { id: 2, colName: 'rowValue2' },
  //     { id: 3, colName: 'rowValue3' },
  //   ]);

  await knex(tableNames.users).del();
  await knex(tableNames.posts).del();

  await knex(tableNames.users).insert(await getUsers());
  await knex(tableNames.posts).insert(await getPosts());
}

async function getUsers() {
  const res = await axios.get(
    'http://jsonplaceholder.typicode.com/users/?limit=10'
  );
  const users = res.data;

  const editedUsers = users.map((user: any) => {
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 2 ? nameParts[2] : nameParts[1];
    const { email, username } = user;
    const randomPassword = Math.random().toString(36).substring(30);

    return {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email,
      password: randomPassword,
    };
  });
  return editedUsers;
}

async function getPosts() {
  const postRes = await axios.get(
    'http://jsonplaceholder.typicode.com/posts/?limit=50'
  );
  const posts = postRes.data;

  const userRes = await axios.get('http://jsonplaceholder.typicode.com/users/');
  const users = userRes.data;

  const editedPosts = posts.map((post: any) => {
    let { title, body, userId } = post;

    const verifiedUserId = users.find((user: any) => user.id === userId)
      ? userId
      : users[0].id;

    return {
      title,
      body,
      user_id: verifiedUserId,
    };
  });
  return editedPosts;
}
