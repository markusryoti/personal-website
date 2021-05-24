import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import dotenv from 'dotenv';
dotenv.config();

import api from './api/index';

import { errorHandler, notFound } from './middlewares';

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', process.env.FRONTEND_URL!] }));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'Blog api',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
