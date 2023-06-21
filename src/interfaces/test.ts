import { Document } from 'mongoose';

export default interface ITest extends Document {
    name: string;
    describe: string;
}