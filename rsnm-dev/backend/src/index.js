require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { startFetchJob } = require("./jobs/fetchJob");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postsRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start cron job
startFetchJob();

app.listen(PORT, () => {
  console.log(`[server] rsnm-dev backend running on port ${PORT}`);
});
