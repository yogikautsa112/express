const express = require("express");
const router = express.Router();
const { likePost, unlikePost } = require("../controllers/likeController");
const {authenticateToken} = require("../middlewares/authMiddleware");


router.post("/like",authenticateToken, likePost);
router.post("/unlike",authenticateToken, unlikePost);

module.exports = router;
