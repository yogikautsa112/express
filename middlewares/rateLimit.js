const rateLimit = require("express-rate-limit");

// 1. Limit untuk Public API (tanpa login)
const publicLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 60, // 60 requests per minute
    message: { error: "Too many requests from this IP, please try again later." },
});

// 2. Limit untuk Authenticated API (pakai JWT)
const authenticatedLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 200, // 200 requests per minute
    message: { error: "Request limit reached for authenticated users." },
});

// 3. Limit untuk Admin API
const adminLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 500, // 500 requests per minute
    message: { error: "Admin request limit exceeded." },
});

// 4. Limit untuk WebSocket Real-time Events
const wsLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 100, // 100 requests per minute
    message: { error: "Too many real-time requests." },
});

module.exports = { publicLimiter, authenticatedLimiter, adminLimiter, wsLimiter };
