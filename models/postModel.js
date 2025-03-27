const pool = require("../config/db");

// Buat postingan baru
const createPost = async (userId, content) => {
    const result = await pool.query(
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
        [userId, content]
    );
    return result.rows[0];
};

// Ambil semua postingan
const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    return result.rows;
};

// Ambil postingan berdasarkan ID
const getPostById = async (id) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result.rows[0];
};

// Update postingan (hanya oleh pemiliknya)
const updatePost = async (postId, userId, content) => {
    const result = await pool.query(
        "UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
        [content, postId, userId]
    );
    return result.rows[0];
};

// Hapus postingan (hanya oleh pemiliknya)
const deletePost = async (postId, userId) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
        [postId, userId]
    );
    return result.rows[0];
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
