import express from 'express';
import Posts from './posts.model';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.query();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.query().findById(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPost = await Posts.query().insert(req.body);
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

export default router;
