import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import model from '../models/model';
import 'express-async-errors';

export const createTest = async function (req: Request, res: Response, next: NextFunction) {
    // const ls = await model.create({
    //     $set: {
    //         name: req.body.name,
    //         describe: req.body.describe,
    //     },
    // });
    // console.log(ls);
    // if(ls)
    //     return res.status(200).json({ls, message: 'Them Thanh Cong' });

    //     return res.status(400).json({ls, message: 'Khong co du lieu can tim de sua'})
    let { name, describe} = req.body;
    const test = new model({
        _id: new mongoose.Types.ObjectId(),
        name,
        describe
    });
    if(!name)
        throw new Error('No Input Name');
    if(!describe)
        throw new Error('No Input Describe');
    test.save().then(function(result){
        return res.status(201).json({result, message: 'Create Succeed'});
    })
    .catch(function(error){
        return next(error);
        //return res.status(500).json({message: error.message})
    })
};
export const editTest = async function (req: Request, res: Response, next: NextFunction) {
    let {id, name, describe} = req.body;
    try {
        if(!id)
        throw new Error('No Input Data');
    if(!name)
        throw new Error('No Input Data Name');
    if(!describe)
        throw new Error('No Input Data Describe');

    const ls = await model.findOneAndUpdate({name: id}, {name: name, describe: describe}).catch(function(err){next(err)});
    if(ls == null)
        throw new Error('No Find on Database');
        
    return res.status(200).json({ls, message: 'Update Succeed' });
    } catch (err) {
        next(err);
    }
    // const ls = await model.findOneAndUpdate({name: req.body.id}, {
    //     $set: {
    //         name: req.body.name,
    //         describe: req.body.describe,
    //     },
    // });
    // if(!req.body.id)
    //     throw new Error('');
};

export const removeTest = async function (req: Request, res: Response, next: NextFunction) {
    let name = req.body.name;
    if(!name){
        throw new Error('Input Error');
    }else{
        const ls = await model.findOneAndDelete({name: name}).catch(function(err){next(err)})
        if (ls == null)
            throw new Error('No Find on Database')
        
        //.catch(function(err) {next(err)});
        return res.status(200).json({ls, message :'Delete Succeed'});
    }
    // const ls = await model.findOneAndDelete({name: name});
    // if(ls) 
    //     return res.status(200).json({ls, message :'Xoa Thanh Cong'});

    //     return res.status(400).json({ls, message: 'No Data'})
};

export const pageTest = async function (req: Request, res: Response, next: NextFunction) {
    const pageSize = 3;
    const q = req.query.q as string || '';
    const page = parseInt(q);
    const ls = await model.find({}).skip(( page * pageSize)- pageSize).limit(pageSize);
    //.catch(function(err){next(err)})
    if(ls.length == 0)
        throw new Error('Page No Data');
    return res.status(200).json({ls, message: 'Page: '+ page});
};


