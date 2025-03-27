const express = require("express");
const { publicLimiter, authenticatedLimiter, adminLimiter } = require("../middlewares/rateLimit");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");
const postRoutes = require("./postRoutes");

const router = express.Router();

// Public API tanpa login (misalnya lihat daftar post)
router.use("/public", publicLimiter);

// Authenticated API (misalnya buat post, like, follow)
router.use("/auth", verifyToken, authenticatedLimiter);

// Admin API (misalnya hapus user, blokir akun)
router.use("/admin", verifyToken, verifyAdmin, adminLimiter);

// Gunakan routes yang sudah ada
router.use("/", postRoutes);

module.exports = router;
