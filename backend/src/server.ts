import express, { NextFunction, Response, Request } from 'express';
import routes from './routes';
import AppError from './shared/erros';

const app = express();

app.use(express.json());
app.use(routes);


app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message });
  };

  console.error('Internal server error', error);

  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello back-end' });
});

/* eslint no-console: ["error", { allow: ["log"] }] */
app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
