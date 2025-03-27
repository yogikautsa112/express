const Follow = require("../models/followModel");

const followUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;
        if (follower_id === following_id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const follow = await Follow.followUser(follower_id, following_id);
        await Follow.updateFollowerCount(following_id);
        await Follow.updateFollowingCount(follower_id);

        res.status(201).json({ message: "Followed successfully", follow });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        const unfollow = await Follow.unfollowUser(follower_id, following_id);
        if (!unfollow) {
            return res.status(400).json({ error: "Not following this user" });
        }

        await Follow.updateFollowerCount(following_id);
        await Follow.updateFollowingCount(follower_id);

        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    

const getFollowers = async (req, res) => {
    try {
        const userId = req.user.id;
        const followers = await Follow.getFollowers(userId);
        res.status(200).json({ followers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFollowing = async (req, res) => {
    try {
        const userId = req.user.id;
        const following = await Follow.getFollowing(userId);
        res.status(200).json({ following });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
