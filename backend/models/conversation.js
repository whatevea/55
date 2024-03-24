import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
    users: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
);

const conversation = mongoose.model('conversation', conversationSchema);

export default conversation;
