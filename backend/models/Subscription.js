import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Sub_Plan'
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status: {
        type: String
    }
})
const Subscription = mongoose.model('Subscription', schema);
export default Subscription;
