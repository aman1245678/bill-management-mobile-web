const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "exp://172.16.2.3:8081",
      "http://172.16.2.3:8081",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/billmanager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const billSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  billDate: { type: Date, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bill = mongoose.model("Bill", billSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fs = require("fs");
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

app.post("/api/bills", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { name, amount, description, billDate } = req.body;

    if (!name || !amount || !billDate) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const newBill = new Bill({
      name: name.trim(),
      amount: parseFloat(amount),
      description: description?.trim() || "",
      billDate: new Date(billDate),
      fileUrl,
    });

    await newBill.save();
    console.log("✅ Bill saved successfully");
    res.status(201).json(newBill);
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

app.get("/api/bills", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {});
