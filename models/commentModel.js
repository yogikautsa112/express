const pool = require("../config/db");

const Comment = {
    async addComment(userId, postId, content) {
        const result = await pool.query(
            "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
            [userId, postId, content]
        );
        return result.rows[0];
    },

    async getCommentsByPost(postId) {
        const result = await pool.query(
            "SELECT c.id, c.content, c.created_at, u.name AS username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at ASC",
            [postId]
        );
        return result.rows;
    },

    async deleteComment(commentId, userId) {
        const result = await pool.query(
            "DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *",
            [commentId, userId]
        );
        return result.rows[0];
    }
};

module.exports = Comment;
