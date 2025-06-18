import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Token not provided" });
    return; // End the request-response cycle
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      req.userId = decoded.userId as string;
      next(); // Pass control to next middleware
    } else {
      res.status(403).json({ message: "Invalid token" });
      return; // End the request-response cycle
    }
  } catch (err) {
    res.status(403).json({ message: "Token verification failed" });
    return; // End the request-response cycle
  }
};