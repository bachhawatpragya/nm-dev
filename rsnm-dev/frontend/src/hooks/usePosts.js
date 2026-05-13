import useSWR from "swr";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function usePosts({ subreddit, page = 1, limit = 25, sortBy = "score" } = {}) {
  const params = new URLSearchParams({ page, limit, sortBy });
  if (subreddit) params.append("subreddit", subreddit);

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/api/posts?${params}`,
    fetcher,
    { refreshInterval: 60000 } // refresh every 60 seconds
  );

  return { data, error, isLoading };
}

export function useTrends() {
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/api/posts/trends`,
    fetcher,
    { refreshInterval: 300000 } // refresh every 5 minutes
  );

  return { data, error, isLoading };
}

export function useSearch(query, subreddit) {
  const params = new URLSearchParams({ q: query });
  if (subreddit) params.append("subreddit", subreddit);

  const { data, error, isLoading } = useSWR(
    query ? `${BASE_URL}/api/posts/search?${params}` : null,
    fetcher
  );

  return { data, error, isLoading };
}
