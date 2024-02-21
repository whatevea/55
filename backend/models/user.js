import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: "Freelancer"
    }
})
const User = mongoose.model('User', schema);
export default User;
