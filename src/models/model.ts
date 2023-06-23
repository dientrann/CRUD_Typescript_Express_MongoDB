import mongoose, {Schema} from 'mongoose';
import ITest from '../interfaces/test';


const testSchema: Schema = new Schema(
    {
        name: String,
        describe: String,
    },
    {
        timestamps: true
    });
export default mongoose.model<ITest>("Model", testSchema);

  