const express = require("express");
const router = express.Router();
const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const {authenticateToken} = require("../middlewares/authMiddleware");


router.post("/comment",authenticateToken, addComment);
router.get("/comments/:post_id",authenticateToken, getComments);
router.delete("/comment",authenticateToken, deleteComment);

module.exports = router;
