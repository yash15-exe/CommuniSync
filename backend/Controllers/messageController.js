import messageModel from "../Models/MessageModel.js";

export const getAllMessages = async (req, res) => {
    try {
        const { community, lastMessageId } = req.body; // Or use req.params if you're getting the community ID from the URL
        console.log(req.body);
        const communityId = community._id;
        
        const pageSize = 10
        const query = { community:communityId };

        // If lastMessageId is provided, fetch messages older than this ID
        if (lastMessageId) {
            const lastMessage = await messageModel.findById(lastMessageId);
            query.createdAt = { $lt: lastMessage.createdAt };
        }

        // Fetch messages with pagination and sort by creation date
        const messages = await messageModel.find(query)
                                           .sort({ createdAt: -1 })
                                           .limit(parseInt(pageSize));

        // Check if there are messages found
        if (messages.length > 0) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({ message: "No more messages found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
