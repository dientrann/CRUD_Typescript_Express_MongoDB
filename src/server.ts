import express , {Request, Response,  NextFunction} from 'express';
import {connect} from "./config/connectDb";
import model from './models/model';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import testRoute from './routes/test';
import config from './config/loadConfig';
import { errorHandler, errorPath } from './error/errorHandler';
import { userRoute } from './routes/userRoute';
import 'express-async-errors';
import cookieParser from 'cookie-parser';


connect();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

//app.use(express.cookieParser('secret'));
//app.use(express.cookieSession());
//app.use(express.session({ secret: 'anything' }));
//app.use(passport.initialize());
//app.use(passport.session());


app.get('/', async function(req, res, next) {

    const test = await model.find({});
    if (test) {
        return res.status(200).json(test);
    } else {
        throw new Error('Error GET')
    }
});
   
app.use('/test', testRoute);
app.use('/auth', userRoute);

app.get('/err', (req: Request, res: Response, next: NextFunction) => {
    next(res.status(400).json('err'))
})

// response format:
// {
//     data: T | null,
//     message: string,
//     code: number,
// }

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