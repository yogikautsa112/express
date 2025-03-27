const Like = require("../models/likeModel");

const likePost = async (req, res) => {
    try {
        const {  post_id } = req.body;
        const userId = req.user.id;

        const alreadyLiked = await Like.checkLike(userId, post_id);
        if (alreadyLiked) {
            return res.status(400).json({ error: "You already liked this post" });
        }

        const like = await Like.addLike(userId, post_id);
        res.status(201).json({ message: "Post liked", like });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unlikePost = async (req, res) => {
    try {
        const {  post_id } = req.body;
        const userId = req.user.id;

        const alreadyLiked = await Like.checkLike(userId , post_id);
        if (!alreadyLiked) {
            return res.status(400).json({ error: "You haven't liked this post" });
        }

        await Like.removeLike(userId, post_id);
        res.status(200).json({ message: "Post unliked" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { likePost, unlikePost };
