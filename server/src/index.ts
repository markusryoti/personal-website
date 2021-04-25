import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello from blog api' });
});

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});
