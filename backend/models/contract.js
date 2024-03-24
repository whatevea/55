import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    hirer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
    },
    start_date: {
        type: Date,
    },
    status: {
        default: 'Not Started',
        type: String,
    }
},
    {
        timestamps: true
    }
)
const Contract = mongoose.model('Contract', schema);
export default Contract;
