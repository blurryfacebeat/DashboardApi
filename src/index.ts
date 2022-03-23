import express from 'express';
import { PORT } from './constants/constants.js';

const app = express();

app.get('/hello', (req, res) => {
  res.send({
    message: 'Hello',
  });
});

app.post('/hello', (req, res) => {
  console.log(req);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
