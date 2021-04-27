import app from './app';

import dotenv from 'dotenv';
dotenv.config();

import setUpDb from './db';

setUpDb();

const port = process.env.API_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
