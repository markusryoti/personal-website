import express from 'express';
import { authenticateToken } from '../../middlewares';
import Images from '../images/images.model';
import PostImages from '../post_images/post_images.model';
import Posts from './posts.model';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.query().orderBy('created_at', 'desc');
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

router.post('/', authenticateToken, async (req: any, res, next) => {
  try {
    const { content, title, description, image_url, s3Links } = req.body;
    const userId = req.user.id;

    const newPost = await Posts.query().insert({
      content,
      title,
      description,
      user_id: userId,
      image_url,
    });

    for (const link of s3Links) {
      const imgIds = await Images.query().select('*').where('url', link);

      await PostImages.query().insert({
        image_id: imgIds[0].id,
        post_id: newPost.id,
      });
    }

    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', authenticateToken, async (req: any, res, next) => {
  const { id } = req.params;
  const { title, content, description, image_url, s3Links } = req.body;

  try {
    const post = await Posts.query().findById(id);
    if (post.user_id !== req.user.id) {
      res.status(401);
      throw new Error('No access to delete specific post');
    }

    const success = await Posts.query()
      .patch({ title, content, description, image_url })
      .findById(id);

    if (!success) {
      throw new Error(`Updating post with id: ${id} failed`);
    }

    for (const link of s3Links) {
      const imageJoin = (await Images.query()
        .select('images.id', 'images.url', 'post_images.id as post_image_id')
        .leftJoin('post_images', 'images.id', 'post_images.image_id')
        .where('images.url', link)) as any;

      if (!imageJoin.post_image_id) {
        await PostImages.query().insert({
          image_id: imageJoin[0].id,
          post_id: id,
        });
      }
    }

    res.json({ message: 'Post updated' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req: any, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.query().findById(id);
    if (post.user_id !== req.user.id) {
      res.status(401);
      throw new Error('No access to delete specific post');
    }

    const numRows = await Posts.query().deleteById(id);
    if (numRows === 0) {
      throw new Error(`Deleting post with id: ${id} failed`);
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
