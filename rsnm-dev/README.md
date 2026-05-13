# rsnm-dev

A read-only posts monitoring platform that aggregates public Reddit posts and presents them in a searchable, filterable dashboard.

## Overview

rsnm-dev fetches publicly available Reddit posts from selected subreddits via the official Reddit API and presents them in a structured, filterable dashboard. Users can browse trending discussions, filter by topic or subreddit, and monitor content relevant to their interests.

## Features

- Fetches public posts from selected subreddits via Reddit's OAuth API
- Stores and indexes post metadata in PostgreSQL for fast querying
- Serves filtered, searchable post feeds to the frontend
- Displays trends and analytics using Chart.js
- Filter posts by subreddit, topic, score, and date

## What it does NOT do

- Post, comment, vote, or otherwise interact with Reddit
- Access private or restricted subreddits
- Profile or store individual user data
- Exceed Reddit API rate limits
- Share or sell Reddit data to third parties

## Target Subreddits

`r/programming` · `r/webdev` · `r/Python` · `r/MachineLearning` · `r/datascience` · `r/javascript` · `r/devops` · `r/opensource` · `r/technology` · `r/news`

## Getting Started

### Prerequisites

- Docker + Docker Compose
- Reddit API credentials (client ID + secret)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/rsnm-dev.git
cd rsnm-dev
```

### 2. Configure environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
# Fill in REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and DB values
```

Note: Docker Compose runs the backend on port `3000` (see `docker-compose.yml`). If you run the backend locally, set `PORT=3000` in your `.env` to match the Docker setup.

### 3. Run with Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432
├── docker-compose.yml
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Docker + Docker Compose
- Reddit API credentials (client ID + secret)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/rsnm-dev.git
cd rsnm-dev
```

### 2. Configure environment

```bash
cp .env.example .env
# Fill in your Reddit API credentials
```

### 3. Run with Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

## Reddit API Compliance

This project strictly follows:
- [Reddit Developer Terms of Service](https://www.redditinc.com/policies/developer-terms)
- [Reddit Data API Terms](https://www.reddit.com/wiki/api-terms)
- OAuth2 app-only authentication
- Proper user-agent identification on every request
- Rate limiting and request caching per Reddit API guidelines

## License

MIT
