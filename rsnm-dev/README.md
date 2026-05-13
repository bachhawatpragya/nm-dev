# rsnm-dev

A read-only Reddit news monitoring platform that aggregates public Reddit posts and allows users to discover and filter content based on their interests and requirements.

## Overview

rsnm-dev fetches publicly available Reddit posts from selected subreddits via the official Reddit API and presents them in a structured, filterable dashboard. Users can browse trending discussions, filter by topic or subreddit, and monitor content relevant to their interests.

## What it does

- Fetches public posts from selected subreddits via Reddit's official OAuth API
- Stores and indexes post metadata in PostgreSQL for fast querying
- Serves filtered, searchable post feeds to the frontend
- Displays trends and post analytics via Chart.js visualizations
- Allows users to filter content by subreddit, topic, score, and date

## What it does NOT do

- Post, comment, vote, or interact with Reddit in any way
- Access private subreddits or restricted content
- Profile or store individual user data
- Exceed Reddit API rate limits
- Share or sell Reddit data to third parties

## Target Subreddits

`r/programming` · `r/webdev` · `r/Python` · `r/MachineLearning` · `r/datascience` · `r/javascript` · `r/devops` · `r/opensource` · `r/technology` · `r/news`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite, Axios, SWR, Chart.js |
| Backend | Node.js, Express |
| Database | PostgreSQL + Prisma ORM |
| Reddit API | Axios (direct OAuth endpoints) |
| Scheduler | node-cron |
| Infra | Docker + docker-compose |

## Project Structure

```
rsnm-dev/
├── frontend/                  # React + Vite dashboard
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── hooks/             # SWR data fetching hooks
│   │   └── pages/             # Dashboard pages
│   └── package.json
├── backend/                   # Node.js + Express API
│   ├── src/
│   │   ├── routes/            # REST API endpoints
│   │   ├── jobs/              # Cron jobs for Reddit fetching
│   │   ├── reddit/            # Reddit OAuth + fetcher
│   │   └── middleware/        # Auth, error handling
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json
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
- Backend API: http://localhost:4000
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
