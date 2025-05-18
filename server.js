const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/api");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notification Service API Running");
});

app.use("/", notificationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
