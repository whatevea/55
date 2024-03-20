import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({

    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
