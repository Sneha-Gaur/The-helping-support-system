const express = require("express");
const app = express();
const problemRoutes = require("./routes/problem");

app.use(express.json());

// Routes
app.use("/api/problems", problemRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
