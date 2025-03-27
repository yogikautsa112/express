const pool = require("../config/db");

const Like = {
    async addLike(userId, postId) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); // Mulai transaksi

            const likeResult = await client.query(
                "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *",
                [userId, postId]
            );

            await client.query(
                "UPDATE posts SET like_count = like_count + 1 WHERE id = $1",
                [postId]
            );

            await client.query("COMMIT"); // Selesai transaksi
            return likeResult.rows[0];
        } catch (error) {
            await client.query("ROLLBACK"); // Batalkan jika ada error
            throw error;
        } finally {
            client.release();
        }
    },

    async removeLike(userId, postId) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            await client.query(
                "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
                [userId, postId]
            );

            await client.query(
                "UPDATE posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = $1",
                [postId]
            );

            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    },

    async checkLike(userId, postId) {
        const result = await pool.query(
            "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
            [userId, postId]
        );
        return result.rows.length > 0;
    }
};

module.exports = Like;
