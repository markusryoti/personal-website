import express from 'express';
import Users from './users.models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Users.query();
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

export default router;
