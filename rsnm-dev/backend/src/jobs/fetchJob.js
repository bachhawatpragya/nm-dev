const cron = require("node-cron");
const { fetchAllSubreddits } = require("../reddit/client");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Runs every 15 minutes
function startFetchJob() {
  cron.schedule("*/15 * * * *", async () => {
    console.log("[cron] Fetching Reddit posts...");
    try {
      const posts = await fetchAllSubreddits();

      // Upsert posts — avoid duplicates
      for (const post of posts) {
        await prisma.post.upsert({
          where: { id: post.id },
          update: {
            score: post.score,
            commentCount: post.commentCount,
            fetchedAt: new Date(),
          },
          create: post,
        });
      }

      console.log(`[cron] Upserted ${posts.length} posts.`);
    } catch (err) {
      console.error("[cron] Fetch job failed:", err.message);
    }
  });

  console.log("[cron] Reddit fetch job scheduled every 15 minutes.");
}

module.exports = { startFetchJob };
