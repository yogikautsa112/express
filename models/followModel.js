const pool = require("../config/db");

const Follow = {
    async followUser(followerId, followingId) {
        const result = await pool.query(
            "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *",
            [followerId, followingId]
        );
        return result.rows[0];
    },

    async unfollowUser(followerId, followingId) {
        const result = await pool.query(
            "DELETE FROM follows WHERE follower_id = $1 AND following_id = $2 RETURNING *",
            [followerId, followingId]
        );
        return result.rows[0];
    },

    async getFollowers(userId) {
        const result = await pool.query(
            "SELECT u.id, u.name FROM follows f JOIN users u ON f.follower_id = u.id WHERE f.following_id = $1",
            [userId]
        );
        return result.rows;
    },

    async getFollowing(userId) {
        const result = await pool.query(
            "SELECT u.id, u.name FROM follows f JOIN users u ON f.following_id = u.id WHERE f.follower_id = $1",
            [userId]
        );
        return result.rows;
    }

    
};

const updateFollowerCount = async (userId) => {
    await pool.query(
        "UPDATE users SET followers_count = (SELECT COUNT(*) FROM follows WHERE following_id = $1) WHERE id = $1",
        [userId]
    );
};

const updateFollowingCount = async (userId) => {
    await pool.query(
        "UPDATE users SET following_count = (SELECT COUNT(*) FROM follows WHERE follower_id = $1) WHERE id = $1",
        [userId]
    );
};




module.exports = {Follow ,updateFollowerCount,updateFollowingCount};
