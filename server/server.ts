import express from 'express';
import { generateChallenge } from './generator';

const app = express();

app.get('/api/board', (req, res) => {
  const board = generateChallenge('medium');
  res.json(board);
});

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening on port 3001');
});
