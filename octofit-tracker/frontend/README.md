# OctoFit Tracker frontend

React 19 presentation tier built with Vite. The development server runs on port `5173` and proxies `/api` requests to the backend on port `8000` when using localhost.

## API configuration

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using the Codespace name shown in its URL:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Restart Vite after changing `.env.local`. When the variable is unset, the API base URL falls back to `http://localhost:8000`.

Use `.env.example` as a starting point; keep `.env.local` local to your workspace.

## Commands

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
