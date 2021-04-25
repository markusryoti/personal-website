import express from 'express';

import api from './api/index';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Blog api',
  });
});

app.use('/api/v1', api);

export default app;
