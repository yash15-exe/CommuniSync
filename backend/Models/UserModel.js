import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  joinedCommunities: [{
    type: Schema.Types.ObjectId,
    ref: 'Community',
  }]
 
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;
