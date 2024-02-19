import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    descritpion: {
        type: String,
    }


})
const Job = mongoose.model('Job', schema);
export default Job;
