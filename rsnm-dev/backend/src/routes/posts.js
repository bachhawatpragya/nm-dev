const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/posts — fetch posts with optional filters
router.get("/", async (req, res) => {
  try {
    const { subreddit, limit = 25, page = 1, sortBy = "score" } = req.query;

    const where = subreddit ? { subreddit } : {};
    const orderBy = { [sortBy]: "desc" };

    const posts = await prisma.post.findMany({
      where,
      orderBy,
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    const total = await prisma.post.count({ where });

    res.json({ posts, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/trends — post count per subreddit for chart
router.get("/trends", async (req, res) => {
  try {
    const trends = await prisma.post.groupBy({
      by: ["subreddit"],
      _count: { id: true },
      _avg: { score: true },
      orderBy: { _count: { id: "desc" } },
    });

    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/search — keyword search in titles
router.get("/search", async (req, res) => {
  try {
    const { q, subreddit } = req.query;
    if (!q) return res.status(400).json({ error: "Query param 'q' required" });

    const where = {
      title: { contains: q, mode: "insensitive" },
      ...(subreddit ? { subreddit } : {}),
    };

    const posts = await prisma.post.findMany({ where, take: 50, orderBy: { score: "desc" } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
