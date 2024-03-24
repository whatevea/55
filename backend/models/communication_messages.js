import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderData: {
        type: Schema.Types.Mixed,
        required: true,
    },
    receiverData: {
        type: Schema.Types.Mixed,
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
