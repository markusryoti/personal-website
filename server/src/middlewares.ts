const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};

const errorMessages = {
  UniqueViolationError: 'Record already exists.',
};

export function notFound(req: any, res: any, next: any) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(error: any, req: any, res: any, next: any) {
  res.status(500);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong in the server'
        : error.stack,
    errors: error.errors || undefined,
  });
}
