const express = require("express");
const router = express.Router();
const db = require("../config/db"); // MySQL connection instance

// 👉 POST: Add a new problem
router.post("/add", async (req, res) => {
  try {
    const { user_id, category, description, location } = req.body;

    // Validation
    if (!user_id || !category || !description || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into DB
    const query = `
      INSERT INTO problems (user_id, category, description, location, status, created_at)
      VALUES (?, ?, ?, ?, 'Pending', NOW())
    `;
    await db.query(query, [user_id, category, description, location]);

    return res.status(201).json({ message: "Problem reported successfully" });
  } catch (error) {
    console.error("Error adding problem:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// 👉 GET: Fetch all problems
router.get("/all", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM problems ORDER BY created_at DESC");
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
