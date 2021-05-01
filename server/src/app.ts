import cors from 'cors';
import express from 'express';

import api from './api/index';

import { errorHandler, notFound } from './middlewares';

const app = express();

app.disable('x-powered-by');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Blog api',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
