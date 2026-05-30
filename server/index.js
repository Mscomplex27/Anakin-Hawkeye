require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRouter = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRouter);

app.get("/", (req, res) => {
  res.json({ message: "HawkEye AI is running." });
});

app.listen(PORT, () => {
  console.log(`🦅 HawkEye AI server running on http://localhost:${PORT}`);
});
