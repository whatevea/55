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
    description: {
        type: String
    }
})
const Applied_Vacancy = mongoose.model('Applied_Vacancy', schema);
export default Applied_Vacancy;
