import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
})
const Sub_Plan = mongoose.model('Sub_Plan', schema);
export default Sub_Plan;
