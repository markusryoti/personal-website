import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};

export function notFound(req: any, res: any, next: any) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(error: any, req: any, res: any, next: any) {
  // Shouldn't be any other type at this point
  let statusCode;
  try {
    const errorName: 'ValidationError' | 'UniqueViolationError' = error.name;
    statusCode =
      res.statusCode === 200 ? errorTypes[errorName] || 500 : res.statusCode;
  } catch (error) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '😭' : error.stack,
    errors: error.errors || undefined,
  });
}

export function authenticateToken(req: any, res: any, next: any) {
  const token = req.headers['authorization'];
  const secret = process.env.JWT_SECRET!;
  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      const error = new Error(`Not authenticated`);
      res.status(403);
      next(error);
    }
    req.user = user;
    next();
  });
}
