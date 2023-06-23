import { Document } from 'mongoose';

export default interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    email: string;
}