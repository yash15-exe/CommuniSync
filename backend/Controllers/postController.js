import postModel from "../Models/PostModel.js";
import uploadToCloudinary from "../utilities/cloudinary.js";

export const getPostsOfThisCommunity = async (req, res) => {
  const { communityObjectId } = req.body;

  try {
    if (communityObjectId) {
      const postsArray = await postModel.find({ community: communityObjectId });
      if (postsArray) {
        if (postsArray.length == 0) {
          return res
            .json({ message: "There are no posts present", data: [] })
            .status(401);
        }
        res.json({ data: postsArray, message: "Messages found Successfully" });
      } else {
        return res.send("Posts not found");
      }
    } else {
      return res.send("Community id invalid or not found").status(404);
    }
  } catch (error) {
    console.log(error);
    return res.send(error).status(500);
  }
};

export const addPost = async (req, res) => {
  try {
    const formData = req.body;
    console.log(req);
    const imageUrl = await uploadToCloudinary(req, res);
    if (formData) {
      console.log(formData);
      const postObject = new postModel({
        community: formData.communityObjectId,
        imageUrl,
        author: formData.senderObjectId,
        authorUsername: formData.authorUsername,
        title: formData.title,
        caption: formData.caption,
      });
      console.log(postObject);

      await postObject.save();
      return res.json({ message: "Post Added" });
    } else {
      res.send("Something went wrong");
    }
  } catch (error) {
    res.send(error);
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Find the post by ID
    const post = await postModel.findById(postId);

    // Check if the userId already exists in the likes array
    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      // If the userId does not exist, add it to the likes array
      post.likes.push(userId);
    } else {
      // If the userId exists, remove it from the likes array
      post.likes.splice(userIndex, 1);
    }

    // Save the post with updated likes
    await post.save();

    // Respond with the updated post
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while liking/unliking the post" });
  }
};
