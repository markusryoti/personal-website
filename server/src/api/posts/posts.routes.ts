import express from 'express';
import Posts from './posts.models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.query();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
