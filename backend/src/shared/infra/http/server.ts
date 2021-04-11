import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '../../erros';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  };

  console.error('Internal server error', err);

  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});


/* eslint no-console: ["error", { allow: ["log"] }] */
app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
