import express from 'express';
import { generateChallenge } from './generator';
import { checkFullBoard } from './checker';

const app = express();

app.get('/api/board', (req, res) => {
  const board = generateChallenge('easy');
  res.json(board);
});

app.post('/api/check', express.json(), (req, res) => {
  const { board } = req.body;
  console.log(board);
  if (
    !(Array.isArray(board) && board.length === 9 && board.every(Array.isArray))
  ) {
    return res.sendStatus(400);
  }
  const valid = checkFullBoard(board);
  res.json({ valid });
});

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening on port 3001');
});
