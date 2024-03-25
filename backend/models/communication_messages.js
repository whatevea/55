import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    },

    message: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
