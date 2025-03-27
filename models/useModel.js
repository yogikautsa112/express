const pool = require("../config/db");

const createUser = async (name, email, password) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password]
    );
    return result.rows[0];
};

const getAllUsers = async () => {
    const result = await pool.query("SELECT id, name, email, created_at FROM users");
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

const updateUser = async (id, name, email) => {
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

const findUserByEmail = async (email) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0]; // Ambil user pertama (jika ada)
    } catch (err) {
        console.error("Error fetching user by email:", err);
        throw err;
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser,findUserByEmail };
