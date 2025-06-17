import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      req.userId = decoded.userId as string;
      next(); 
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Token verification failed" });
  }
};
