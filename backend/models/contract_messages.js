import mongoose from "mongoose";
const { Schema } = mongoose;

const contractMessages = new Schema({

    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true,
    },
    messages: [{
        text: String,
        dateSent: Date,
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
      }],

    { timestamps: true }
);

export default mongoose.model('contractMessages', contractMessagesSchema);

