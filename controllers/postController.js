const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../models/postModel");

const createNewPost = async (req, res) => {
    try {
        const {  content } = req.body;
        const userId = req.user.id;

        // Simpan post ke database
        const newPost = await pool.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
            [userId, content]
        );

        const postId = newPost.rows[0].id;
        const mediaFiles = req.files; // Dari multer untuk upload

        if (mediaFiles && mediaFiles.length > 0) {
            for (const file of mediaFiles) {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                });

                // Simpan URL media ke database
                await pool.query(
                    "INSERT INTO post_media (post_id, media_url, media_type) VALUES ($1, $2, $3)",
                    [postId, result.secure_url, result.resource_type]
                );
            }
        }

        res.status(201).json({ message: "Post created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPost = async (req, res) => {
    try {
        const { post_id } = req.params;

        // Ambil data post
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [post_id]);

        // Ambil media yang terhubung ke post
        const media = await pool.query("SELECT * FROM post_media WHERE post_id = $1", [post_id]);

        res.json({ post: post.rows[0], media: media.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        const updatedPost = await updatePost(id, userId, content);
        if (!updatedPost) return res.status(403).json({ error: "Tidak dapat mengedit postingan orang lain" });

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedPost = await deletePost(id, userId);
        if (!deletedPost) return res.status(403).json({ error: "Tidak dapat menghapus postingan orang lain" });

        res.json({ message: "Postingan berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createNewPost, getPosts, getPost, editPost, removePost };
