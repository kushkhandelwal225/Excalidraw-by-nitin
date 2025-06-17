import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from '@repo/backend-common/config'
export const middleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers["authorization"] ?? ""

    const (decoded) = jwt.verify(token, JWT_SECRET);

    if(decoded.userId){
        req.userId = (decoded ).userId;
    }
    else{
        res.json({
            message : "not verified "
        })
        return
    }
}