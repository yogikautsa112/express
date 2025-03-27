const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postingRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRoutes)
app.use("/post",postRoutes)
app.use("/users/auth",authRoutes)
app.use("/api",likeRoutes);
app.use("/api",commentRoutes);
app.use("/api",followRoutes);
app.use("/api",uploadRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
