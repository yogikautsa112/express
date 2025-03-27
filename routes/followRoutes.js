const express = require("express");
const router = express.Router();
const { followUser, unfollowUser, getFollowers, getFollowing } = require("../controllers/followController");
const {authenticateToken} = require("../middlewares/authMiddleware");


router.post("/follow",authenticateToken, followUser);
router.delete("/unfollow", authenticateToken, unfollowUser);
router.get("/followers",authenticateToken,  getFollowers);
router.get("/following",authenticateToken,  getFollowing);

module.exports = router;
