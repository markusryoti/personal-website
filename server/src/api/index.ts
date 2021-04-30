import express from 'express';

import auth from './auth/auth.routes';
import posts from './posts/posts.routes';
import users from './users/users.routes';
import mail from './mail/mail.routes';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);
router.use('/mail', mail);

router.get('/', (req, res) => {
  res.json({
    message: 'Blog api v1 🚀',
  });
});

export default router;
