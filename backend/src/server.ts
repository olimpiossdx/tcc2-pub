import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello back-end' });
});

/* eslint no-console: ["error", { allow: ["log"] }] */
app.listen(3333, () => console.log('🚀 Server started on port 3333!'));
