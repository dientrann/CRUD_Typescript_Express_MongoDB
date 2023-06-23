import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { parseJsonText } from 'typescript';
import config from '../config/loadConfig';

export const verifyToken = function(req: Request, res: Response, next: NextFunction){
    const token =  req.cookies.name;
    if(!token)
        throw new Error('Access Denied');

    const user = jwt.verify(token, config.token);
    req.user = user;
    next();
}
