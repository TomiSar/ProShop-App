import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User, { IUser } from '../models/userModel';
import { NextFunction, Response } from 'express';
import { CustomRequest, JwtPayloadWithUserId } from '../types'; // Ensure the path is correct

// User must be authenticated
const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayloadWithUserId;

        const user = (await User.findById(decoded.userId).select(
          '-password'
        )) as IUser | null;

        if (!user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }

        req.user = {
          _id: user._id.toString(),
          name: user.name,
          isAdmin: user.isAdmin,
        };

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

// User must be an admin
const admin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
