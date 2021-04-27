import express from 'express';
import Users from './users.model';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Users.query();
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Users.query().findById(id);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

export default router;
