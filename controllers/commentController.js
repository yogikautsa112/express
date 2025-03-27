const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
    try {
        const { post_id, content } = req.body;
        const userId = req.user.id;

        if (!content.trim()) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        const comment = await Comment.addComment(userId, post_id, content);
        res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { post_id } = req.params;
        const comments = await Comment.getCommentsByPost(post_id);
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.body;
        const userId = req.user.id;

        const deleted = await Comment.deleteComment(comment_id, userId);
        if (!deleted) {
            return res.status(403).json({ error: "You can only delete your own comment" });
        }
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addComment, getComments, deleteComment };
