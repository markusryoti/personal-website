import express from 'express';

import bcrypt from 'bcrypt';

import jwt from '../../lib/jwt';
import Users from '../users/users.model';

const router = express.Router();

const ERRORS_MSGS = {
  invalidLogin: 'Login is invalid',
  emailInUse: 'Email is already in use.',
};

router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Users.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(ERRORS_MSGS.emailInUse);
      res.status(403);
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertedUser = await Users.query().insert({
      name,
      email,
      password: hashedPassword,
    });

    delete insertedUser.password;

    const payload = {
      id: insertedUser.id,
      name,
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

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.query().where({ email }).first();

    if (!user) {
      const error = new Error(ERRORS_MSGS.invalidLogin);
      res.status(403);
      throw error;
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!validPassword) {
      const error = new Error(ERRORS_MSGS.invalidLogin);
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      name: user.name,
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

module.exports = router;
