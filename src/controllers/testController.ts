import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import model from '../models/model';
import 'express-async-errors';
import { validateTest, validateID, validatePage } from '../error/validate';


export const createTest = async function (req: Request, res: Response, next: NextFunction) {
    let { name, describe} = req.body;
    const result = await validateTest.validateAsync({name, describe});
    
    if(!result){
        throw new Error('Validation Failed')
    }
    const test = new model({
        _id: new mongoose.Types.ObjectId(),
        name,
        describe
    });
    test.save().then(function(result){
        return res.status(201).json({result, message: 'Create Succeed'});
    })
    .catch(function(error){
        return next(error);
    })
};
export const editTest = async function (req: Request, res: Response, next: NextFunction) {
    let {id, name, describe} = req.body;

    const result = await validateID.validateAsync(id) && await validateTest.validateAsync({name, describe});
    if(!result)
        throw new Error('Validation Failed');

    const ls = await model.findOneAndUpdate({name: id}, {name: name, describe: describe});
    if(ls == null)
        throw new Error('Data Not Found');
        
    return res.status(200).json({ls, message: 'Update Succeed' });
};

export const removeTest = async function (req: Request, res: Response, next: NextFunction) {
    let name = req.body.name;
    const result = await validateID.validateAsync(name);

    if( !result)
        throw new Error('Validation Failed');

    const ls = await model.findOneAndDelete({name: name});
    if (ls == null)
        throw new Error('Data Not Found')
    return res.status(200).json({ls, message :'Delete Succeed'});
};

export const pageTest = async function (req: Request, res: Response, next: NextFunction) {
    const pageSize = 3;
    const q = req.query.q as string|| '1';
    const page = parseInt(q);
    const result = validatePage.validateAsync(page);
    if(!result)
        throw new Error('Validation Failed');
    const ls = await model.find({}).skip(( page * pageSize)- pageSize).limit(pageSize);
    if(ls.length == 0)
        throw new Error('Exceeding');
    return res.status(200).json({ls, message: 'Page: '+ page});
};
