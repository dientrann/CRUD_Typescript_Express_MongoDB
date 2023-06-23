import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { validateInfo, validateUser } from "../error/validateUser";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/loadConfig";
import 'express-async-errors';
import { errObject } from "../error/errorObject";



export const createUser = async function(req: Request, res: Response, next: NextFunction){
    let {username, pass, name, email} = req.body;
    const resultUser = await validateUser.validateAsync({username, pass})
    const resultInfo = await validateInfo.validateAsync({name, email})
    if(!resultUser || !resultInfo)
        throw new Error('Validation Failed');
    const checkUser = await userModel.findOne({username: username})
    if(checkUser)
        throw new errObject(401,'User Exists');
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(pass, salt)
    const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        username,
        password,
        name,
        email
    });
    user.save().then(function(result){
        return res.status(201).send({user : {
            username: username, 
            password: pass, 
            name: name, 
            email: email}, 
            message:'Create Succeed User'});
    }).catch(function(err){
        return next(err);
    })

};

export const loginUser = async function(req: Request, res: Response, next: NextFunction){
    let {username, pass} = req.body;
    const result = await validateUser.validateAsync({username, pass});
    if(!result)
        throw new Error('Validation Failed');
    const user = await userModel.findOne({username: username})
    if(!user)
        throw new errObject(401,'User DataBase Not Found');
    const rs = await bcrypt.compare(pass, user.password)
    if(!rs)
        throw new errObject(401,'Error Password');
    
    const token = jwt.sign({username, pass}, config.token ,{ expiresIn: 60 * 60 * 24 });

    return res.cookie('name', token).status(200).send({username: username, password: pass, message:'Login Succeed'});
};

export const infoUser = async function(req: Request, res: Response, next: NextFunction){

    const user = req.user;
    const username = req.user;
    if(!user)
        throw new Error('Error');
    const infoUser = userModel.findOne({username: '' })
    return res.status(200).json({user, message: 'Authentication Succeed'});
};


export const logout = async function(req: Request, res: Response){
    res.clearCookie('name').send({message: 'Clear Cookie Succeed'});
};






