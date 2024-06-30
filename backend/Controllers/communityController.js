import communityModel from "../Models/CommunityModel.js";
import userModel from "../Models/UserModel.js"; // Ensure you have the User model available
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import uploadToCloudinary from "../utilities/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Create a new community
export const addCommunity = async (req, res) => {
  try {
    const { name, description, rules, members, admins, trending } = req.body;
    const userObject = req.user; // Corrected to directly access the user object
    const username = userObject.username.username; // Extract username correctly
    const uuid = uuidv4();
    const imageUrl = await uploadToCloudinary(req, res);

    const community = new communityModel({
      name,
      communityId: uuid, // Generate a unique ID for the community
      description,
      imageUrl,
      rules,
      members,
      admins,
      trending,
    });

    await community.save();

    const user = await userModel.findOne({ username });

    if (user) {
      user.joinedCommunities.push(community._id); // Store community ID
      await user.save(); // Save the user document
    }
    const userId = user._id;
    community.members.push(userId);
    community.admins.push(userId);
    await community.save();
    res.status(201).json({ message: "Community created", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific community
export const deleteCommunity = async (req, res) => {
  try {
    const username = req.user.username;

    const { communityId } = req.body;



      const community = await communityModel.findByIdAndDelete(communityId);
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
    

    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all the communities joined by the user
export const getMyCommunity = async (req, res) => {
  try {
    const username = req.user.username.username;
    const user = await userModel.findOne({ username }).populate({
      path: 'joinedCommunities',
      populate: [
        { path: 'admins', select: 'username profilePicture' },
        { path: 'members', select: 'username profilePicture' }
      ]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const communities = user.joinedCommunities;
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Search a community by its name
export const SearchCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    const communities = await communityModel.find({
      name: new RegExp(name, "i"),
    }).populate({
      path: 'admins',
      select: 'username profilePicture'
    }).populate({
      path: 'members',
      select: 'username profilePicture'
    });
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Get all trending communities
export const getTrendingCommunity = async (req, res) => {
  try {
    const communities = await communityModel.find({ trending: true })
      .populate({
        path: 'admins',
        select: 'username profilePicture'
      })
      .populate({
        path: 'members',
        select: 'username profilePicture'
      });
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Get a specific Community
export const getThisCommunity = async (req, res) => {
  try {
    const { communityId } = req.body;
    const community = await communityModel.findOne({ communityId })
      .populate({
        path: 'admins',
        select: 'username profilePicture'
      })
      .populate({
        path: 'members',
        select: 'username profilePicture'
      });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



export const addUserToCommunity = async (req, res) => {
  try {
    const username = req.user.username.username;

    const { communityId } = req.body;

    // Check if the user and community exist
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const community = await communityModel.findOne({ communityId });
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const userId = user._id;
    // Add user to community if not already a member
    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();

      // Add community to user's joinedCommunities if not already joined
      if (!user.joinedCommunities.some((c) => c == community._id)) {
        user.joinedCommunities.push(community._id);
        await user.save();
      }

      res.status(200).json({ message: "User added to community successfully" });
    } else {
      res
        .status(400)
        .json({ message: "User is already a member of the community" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove user from community
export const removeUserFromCommunity = async (req, res) => {
  try {
    const { communityId, userId } = req.body;

    // Check if the user and community IDs are provided
    if (!communityId || !userId) {
      return res.status(400).json({ message: "Community ID and User ID are required" });
    }

    // Check if the user and community exist
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const community = await communityModel.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Remove user from community
    community.members = community.members.filter(
      (member) => member.toString() !== userId
    );
    await community.save();

    // Remove community from user's joinedCommunities
    user.joinedCommunities = user.joinedCommunities.filter(
      (c) => c.toString() !== communityId
    );
    await user.save();

    res.status(200).json({ message: "User removed from community successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add admin to community
export const addAdminToCommunity = async (req, res) => {
  try {
    
    const { communityId, userId } = req.body;

    // Check if the user and community exist
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const community = await communityModel.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Add user as admin to community if not already an admin
    if (!community.admins.includes(userId)) {
      community.admins.push(userId);
      await community.save();
      res
        .status(200)
        .json({ message: "User added as admin to community successfully" });
    } else {
      res
        .status(400)
        .json({ message: "User is already an admin of the community" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove admin from community
export const removeAdminFromCommunity = async (req, res) => {
  try {
    const username = req.user.username;
    const { communityId } = req.body;

    // Check if the user and community exist
    const user = await userModel.findById(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const community = await communityModel.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Remove user as admin from community
    community.admins = community.admins.filter(
      (admin) => admin.toString() !== username
    );
    await community.save();
    res
      .status(200)
      .json({ message: "User removed as admin from community successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


