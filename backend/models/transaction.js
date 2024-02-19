import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract'
    },
    amount: {
        type: Number,
    },
    service_fee: {
        type: Number
    },
    datetime: {
        type: Date
    },
    payment_method: {
        type: String
    }
})
const Transaction = mongoose.model('Transaction', schema);
export default Transaction;
