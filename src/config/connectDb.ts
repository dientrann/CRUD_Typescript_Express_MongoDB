import mongoose from "mongoose";
import config from "./mongo";
import { ConnectOptions } from "mongoose";

export const connect = async function(){

    try {
        await mongoose.connect(config.mongo.url, config.option )
            // {
            //     //useFindAndModify: false,
            //     useNewUrlParser: true,
            //     //useCreateIndex: true,
            //     useUnifiedTopology: true
            // } as ConnectOptions)
        //await mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
        console.log('Connect');
    } catch (error) {
        console.log('Error:' + error);
        return process.exit(1);
    }
}
