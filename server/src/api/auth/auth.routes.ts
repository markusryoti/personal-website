import express from 'express';
import bcrypt from 'bcrypt';
import jwt from '../../lib/jwt';
import dotenv from 'dotenv';
dotenv.config();

import Users from '../users/users.model';
import { authenticateToken } from '../../middlewares';

const router = express.Router();

const ERRORS_MSGS = {
  invalidLogin: 'Login is invalid',
  emailInUse: 'Email is already in use.',
  registerToken: 'No correct register token provided',
};

router.post('/signup', async (req, res, next) => {
  const { username, email, password, registerToken } = req.body;

  // Check if the provided token for registration matches the environment token
  // If not, new user cannot be added
  if (registerToken !== process.env.REGISTER_TOKEN) {
    res.status(401);
    next(new Error(ERRORS_MSGS.registerToken));
  }

  try {
    const existingUser = await Users.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(ERRORS_MSGS.emailInUse);
      res.status(403);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertedUser = await Users.query().insert({
      username,
      email,
      password: hashedPassword,
    });

    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      username,
      email,
    };

    const token = await jwt.sign(payload);

    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.query().where({ email }).first();

    if (!user) {
      const error = new Error(ERRORS_MSGS.invalidLogin);
      res.status(403);
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password!);

    if (!validPassword) {
      const error = new Error(ERRORS_MSGS.invalidLogin);
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      username: user.username,
      email,
    };

    const token = await jwt.sign(payload);

    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/load-user',
  authenticateToken,
  async (req: any, res: any, next) => {
    try {
      const user = req.user;
      const dbUser = await Users.query().findById(user.id);

      delete dbUser.password;

      res.json(dbUser);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
