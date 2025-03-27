const userModel = require("../models/useModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "@uEgrG3b7YNsh-XKaffK940"; // Ganti dengan secret key yang aman


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userModel.createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await userModel.updateUser(req.params.id, name, email);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Semua field harus diisi" });
        }

        // Enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan user ke database
        const user = await  userModel.createUser(name, email, hashedPassword);

        res.json({ message: "User berhasil didaftarkan", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findUserByEmail(email);
        if (!user) return res.status(401).json({ error: "Email atau password salah" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Email atau password salah" });

        // Buat token JWT
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login berhasil", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const profile = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser,register,login,profile };
