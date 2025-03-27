const express = require("express");
const { createNewPost, getPosts, getPost, editPost, removePost } = require("../controllers/postController");
const {authenticateToken} = require("../middlewares/authMiddleware");
const { publicLimiter, authenticatedLimiter, adminLimiter } = require("../middlewares/rateLimit");


const router = express.Router();

router.post("/", authenticateToken,authenticatedLimiter, createNewPost); // Buat postingan baru
router.get("/",publicLimiter, getPosts); // Ambil semua postingan
router.get("/:id", getPost); // Ambil 1 postingan berdasarkan ID
router.put("/:id", authenticateToken, editPost); // Edit postingan (hanya pemilik)
router.delete("/:id", authenticateToken, removePost); // Hapus postingan (hanya pemilik)

module.exports = router;
