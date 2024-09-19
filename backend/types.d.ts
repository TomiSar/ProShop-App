import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: {
    _id: string;
    name: string;
    isAdmin: boolean;
  };
}

export interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
