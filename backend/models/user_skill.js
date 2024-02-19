import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    skill: {
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    },
})
const User_Skill = mongoose.model('User_Skill', schema);
export default User_Skill;
