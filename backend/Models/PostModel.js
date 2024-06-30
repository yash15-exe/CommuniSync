import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  imageUrl:{
    type:String,
    req:true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorUsername:{
    type:String
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  isPinned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);
export default postModel;
