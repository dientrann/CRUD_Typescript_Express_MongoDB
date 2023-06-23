import { Request, Response , NextFunction} from "express";
import { errObject } from "./errorObject";

export const errorPath = function(req: Request, res: Response, next: NextFunction) {

    res.status(404).json({status: 'Error', error: 'Invalid Path'});
}



export const errorHandler = function (err: errObject, req: Request, res: Response, next: NextFunction) {
    console.log('Method:', req.method);
    console.log('Data:', req.body);
    console.log('Params:', req.params);
    console.log('Query:', req.query);
    console.log('Error:', err);

    
    const messageError = err.message;
    const error = {
        status: 'Error',
        error: messageError
    }
    const status = err.status || 401;
    res.status(status).json(error);
    return next(err);
}


