const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Optional

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "friends",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to the database.");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ensure this folder exists or create it manually
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Save with original extension:
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  }
});

const upload = multer({ storage: storage });

app.post("/add_user", upload.single('image'), (req, res) => {
  const sql =
  "INSERT INTO friend_details (`name`, `weight`, `height`, `email`, `tel`, `age`, `gender`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const imageFileName = req.file ? req.file.filename : null;

  const values = [
    req.body.name,
    req.body.weight,
    req.body.height,
    req.body.email,
    req.body.tel,
    req.body.age,
    req.body.gender,
    imageFileName,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err.message });
    }
    return res.status(201).json({ success: "Friend added successfully" });
  });
});

app.get("/friends", (req, res) => {
  const sql = "SELECT * FROM friend_details";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    return res.json(result);
  });
});

app.get("/get_friend/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM friend_details WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    return res.json(result);
  });
});

app.put("/edit_user/:id", upload.single('image'), (req, res) => {
  const id = req.params.id;

  const sql =
    "UPDATE friend_details SET `name`=?, `weight`=?, `height`=?, `email`=?, `tel`=?, `age`=?, `gender`=?, `image`=? WHERE id=?";

  const imageFileName = req.file ? req.file.filename : req.body.image;

  const values = [
    req.body.name,
    req.body.weight,
    req.body.height,
    req.body.email,
    req.body.tel,
    req.body.age,
    req.body.gender,
    imageFileName,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err.message });
    }
    return res.json({ success: "Friend updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM friend_details WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Something unexpected has occurred", error: err.message });
    }
    return res.json({ success: "Friend deleted successfully" });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
