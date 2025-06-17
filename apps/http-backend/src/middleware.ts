import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
export const middleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers["authorization"] ?? ""

    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.userId){
        req.userId = decoded.userId;
    }
    else{
        res.json({
            message : "not verified "
        })
        return
    }
}