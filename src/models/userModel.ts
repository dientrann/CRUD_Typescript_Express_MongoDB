import mongoose, {Schema} from 'mongoose';
import IUser from '../interfaces/IUser';
import { string } from 'joi';


const userSchema: Schema = new Schema(
    {
        username: String,
        password: String,
        name: String,
        email: String
    },
    {
        timestamps: true
    });
export default mongoose.model<IUser>("User", userSchema);