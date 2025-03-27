const jwt = require("jsonwebtoken");
const SECRET_KEY = "@uEgrG3b7YNsh-XKaffK940";

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Akses ditolak" });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Pastikan req.user ada
        next();
    } catch (err) {
        res.status(403).json({ error: "Token tidak valid" });
    }
};

module.exports = { authenticateToken };
