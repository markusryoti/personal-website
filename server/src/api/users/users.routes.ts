import express from 'express';
import Users from './users.model';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Users.query();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await Users.query().findById(id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

export default router;
