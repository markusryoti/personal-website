import jwt from 'jsonwebtoken';

interface Payload {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
}

function sign(payload: Payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

export default { sign };
