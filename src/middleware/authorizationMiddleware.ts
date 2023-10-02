import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authenticateJWT(req: Request , res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Without Token' });
  }

  jwt.verify(token, 'password', (err, user ) => {
    if (err) {
      return res.status(403).json({ success: false , message: 'Not Authorized' });
    }
    req.user = user;
    next();
  });
}

export default authenticateJWT;