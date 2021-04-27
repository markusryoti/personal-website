import express from 'express';
import Posts from './posts.model';

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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.query().findById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Posts.query().insert(req.body);
    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
