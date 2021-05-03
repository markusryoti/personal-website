import express from 'express';
import { sendMail } from './mail';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, category, message } = req.body;
    await sendMail(name, email, subject, category, message);
    res.json({ message: 'Email sent' });
  } catch (error) {
    next(error);
  }
});

export default router;
