const axios = require("axios");

const TARGET_SUBREDDITS = [
  "programming",
  "webdev",
  "Python",
  "MachineLearning",
  "datascience",
  "javascript",
  "devops",
  "opensource",
  "technology",
  "news",
];

let accessToken = null;
let tokenExpiresAt = 0;

// Fetch a new OAuth2 app-only access token
async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiresAt) return accessToken;

  const response = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    "grant_type=client_credentials",
    {
      auth: {
        username: process.env.REDDIT_CLIENT_ID,
        password: process.env.REDDIT_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000 - 60000; // refresh 1 min early
  return accessToken;
}

// Fetch posts from a subreddit — strictly read-only
async function fetchPosts(subreddit, category = "hot", limit = 25) {
  const token = await getAccessToken();

  const response = await axios.get(
    `https://oauth.reddit.com/r/${subreddit}/${category}`,
    {
      params: { limit },
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    }
  );

  return response.data.data.children.map((child) => {
    const p = child.data;
    return {
      id: p.id,
      title: p.title,
      subreddit: p.subreddit,
      score: p.score,
      upvoteRatio: p.upvote_ratio,
      commentCount: p.num_comments,
      flair: p.link_flair_text || null,
      permalink: `https://reddit.com${p.permalink}`,
      createdUtc: new Date(p.created_utc * 1000),
    };
  });
}

async function fetchAllSubreddits() {
  const results = [];
  for (const sub of TARGET_SUBREDDITS) {
    try {
      const posts = await fetchPosts(sub, "hot", 25);
      results.push(...posts);
      // Respect Reddit rate limits — 1 request per second
      await new Promise((res) => setTimeout(res, 1000));
    } catch (err) {
      console.error(`Error fetching r/${sub}:`, err.message);
    }
  }
  return results;
}

module.exports = { fetchPosts, fetchAllSubreddits, TARGET_SUBREDDITS };
