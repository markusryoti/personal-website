import express from 'express';

import { authenticateToken } from '../../middlewares';

const router = express.Router();

router.post('/', authenticateToken, (req: any, res: any) => {
  console.log(req);
  res.json({ message: '🖼' });
});

export default router;
