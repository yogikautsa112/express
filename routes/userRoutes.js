const express = require("express");
const userController = require("../controllers/userContoller");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.put("/:id",authenticateToken, userController.updateUser);
router.delete("/:id",authenticateToken, userController.deleteUser);
router.get("/profile", authenticateToken, userController.profile);
router.get("/:id", authenticateToken ,userController.getUserById);


module.exports = router;
