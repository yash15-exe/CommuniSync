import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  senderUsername:{
    type:String,
    required:true
  }
  
}, { timestamps: true });

const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;
