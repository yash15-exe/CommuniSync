import mongoose, { Schema } from 'mongoose';

const communitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  communityId:{
    type:String,
    unique:true,
    required:true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  rules: {
    type: String,
    default: ''
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  trending:{
    type:Boolean,
    default:false
  },
 
}, { timestamps: true });

const communityModel = mongoose.model('Community', communitySchema);
export default communityModel;
