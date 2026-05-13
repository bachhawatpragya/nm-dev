import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import TrendsChart from "../components/TrendsChart";

const SUBREDDITS = [
  "all", "programming", "webdev", "Python",
  "MachineLearning", "datascience", "javascript", "devops",
];

export default function Dashboard() {
  const [subreddit, setSubreddit] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePosts({
    subreddit: subreddit === "all" ? "" : subreddit,
    page,
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>rsnm-dev — Reddit Monitor</h1>

      <TrendsChart />

      <div style={{ margin: "1.5rem 0" }}>
        <label>Filter by subreddit: </label>
        <select onChange={(e) => { setSubreddit(e.target.value); setPage(1); }}>
          {SUBREDDITS.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All" : `r/${s}`}</option>
          ))}
        </select>
      </div>

      {isLoading && <p>Loading posts...</p>}
      {error && <p>Failed to load posts.</p>}

      {data?.posts?.map((post) => (
        <div key={post.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}>
          <a href={post.permalink} target="_blank" rel="noreferrer">
            <strong>{post.title}</strong>
          </a>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>
            r/{post.subreddit} · {post.score} points · {post.commentCount} comments
          </p>
        </div>
      ))}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
