import express , {Request, Response,  NextFunction} from 'express';
import {connect} from "./config/connectDb";
import model from './models/model';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import testRoute from './routes/test';
import config from './config/mongo';
import ValidationError from './error/ValidationError';
import { errorHandler, errorPath } from './error/errorHandler';
import 'express-async-errors';

connect();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async function(req, res, next) {

    const test = await model.find({});
    if (test) {
        return res.status(200).json(test);
    } else {
        throw new Error('Error GET')
    }
});
   
app.use('/test', testRoute)

app.get('/err', (req: Request, res: Response, next: NextFunction) => {
    next(res.status(400).json('err'))
})

// response format:
// {
//     data: T | null,
//     message: string,
//     code: number,
// }

// function errorHandler (err: any, req: Request, res: Response, next: NextFunction) {
//     if (res.headersSent) {
//       return next(err)
//     }
//     console.log('Method:', req.method);
//     console.log('Data:', req.body);
//     console.log('Params:', req.params);
//     console.log('Query:', req.query);
//     console.log('Error:', err);

//     const messageError = err.message;

//     const error = {
//         status: 'Error',
//         error: messageError
//     }
//     const status = err.status || 400 ;
//     return res.status(status).json(error);
//   }

app.use(errorHandler)
app.use(errorPath)
// app.use(function(req: Request, res: Response, next: NextFunction) {

//     res.status(404).send('Invalid Path');
//   })

app.listen(config.server.port, () => {
    console.log('Server is started on 127.0.0.1:', config.server.port)
});

// app.use( function(err: Error, req: Request, res: Response, next: NextFunction) {
//     console.log( `error ${err.message}`) 
//     next(err) // calling next middleware
//   })

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });