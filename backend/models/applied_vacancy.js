import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    applier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cover_letter: {
        type: String
    },
    offered_amount: {
        type: Number
    },
    attachment_url: {
        type: String
    }
})
const Applied_Vacancy = mongoose.model('Applied_Vacancy', schema);
export default Applied_Vacancy;
