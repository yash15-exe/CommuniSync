import commentModel from "../Models/CommentModel.js";


export const addComment = async (req, res) => {
  const { content, userId, postId } = req.body;

  try {
    // Create a new comment
    const newComment = new commentModel({
      post: postId,
      author: userId,
      content: content,
      likes: [],
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    // Find the comment by ID and delete it
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  }
};
export const getComments = async (req, res) => {
  const { postId } = req.body;

  try {
    // Find comments for the given post ID
    const comments = await commentModel
      .find({ post: postId })
      .populate("author", "username")
      .populate("likes", "username")
      .exec();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving comments" });
  }
};
