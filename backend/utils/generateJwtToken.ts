import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateJwtToken = (res: Response, userId: string): void => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT SECRET is not defined');
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateJwtToken;
