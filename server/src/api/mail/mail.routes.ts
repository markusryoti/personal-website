import express from 'express';
import { sendMail } from './mail';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { sender, subject, text } = req.body;
    await sendMail(sender, subject, text);
    res.json({ message: 'Email sent' });
  } catch (error) {
    next(error);
  }
});

export default router;
