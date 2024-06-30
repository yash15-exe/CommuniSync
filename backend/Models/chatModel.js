import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, { timestamps: true });

const chatModel = mongoose.model('Chat', chatSchema);
export default chatModel;
