# StoryLingo Demo

A voice-first language learning app for kids (ages 3-10) that uses fairy tales and AI storytelling. Kids have real-time voice conversations with story characters using OpenAI's Realtime API.

**This repo is a teaching tool** — use it to learn how to clone a GitHub repo, configure environment variables, and deploy a full-stack app to Railway.

## What You'll Learn

- How to clone a repository from GitHub
- How to configure environment variables using Claude Code or an IDE
- How to deploy a full-stack app (React + Express) to Railway

## Prerequisites

- A [GitHub](https://github.com) account
- An [OpenAI API key](https://platform.openai.com/api-keys) with access to the **Realtime API** (`gpt-realtime` model)
- A [Railway](https://railway.app) account (free tier works)
- [Node.js 18+](https://nodejs.org/) installed (for local testing, optional)

---

## Deploy to Railway (Step-by-Step)

### Step 1: Clone This Repo

```bash
git clone https://github.com/deewang/storylingo-demo.git
cd storylingo-demo
```

### Step 2: Create Your OpenAI Stored Prompt

The app uses an OpenAI **stored prompt** to power the storytelling voice agent. You need to create one in your OpenAI account:

1. Go to [platform.openai.com/prompts](https://platform.openai.com/prompts)
2. Click **Create prompt**
3. Open [`prompts/storyteller.md`](prompts/storyteller.md) in this repo and copy the **Prompt Template** section
4. Paste it into the OpenAI prompt editor — make sure the three variables (`{{story_title}}`, `{{story_context}}`, `{{story_beats}}`) are recognised
5. Save the prompt and copy the **Prompt ID** (starts with `pmpt_`)

### Step 3: Create a Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** > **Deploy from GitHub repo**
3. Connect your GitHub account if you haven't already
4. Select the `storylingo-demo` repo (you may need to fork it to your own account first)

### Step 4: Set Environment Variables in Railway

In your Railway service dashboard, go to **Variables** and add:

| Variable | Value | Example |
|----------|-------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-proj-abc123...` |
| `OPENAI_PROMPT_ID` | Your stored prompt ID from Step 2 | `pmpt_abc123...` |
| `EXPO_PUBLIC_DOMAIN` | Your Railway app's public domain | `storylingo-demo-production.up.railway.app` |

> **Important:** `EXPO_PUBLIC_DOMAIN` is baked into the app at build time. To get your Railway domain: go to your service **Settings** > **Networking** > **Generate Domain**. Copy that domain (without `https://`), set it as `EXPO_PUBLIC_DOMAIN`, then trigger a redeploy.

### Step 5: Deploy

Railway will automatically build and deploy when you push code or set environment variables. You can also click **Deploy** manually in the dashboard.

The build runs:
- `npm run build` — bundles the Expo web frontend + Express server
- `npm run server:prod` — starts the production server

### Step 6: Verify It Works

1. Open your Railway app URL (e.g. `https://storylingo-demo-production.up.railway.app`)
2. You should see the StoryLingo landing page
3. Pick a story and language
4. Test the voice conversation (requires microphone access in your browser)

---

## Local Development (Optional)

If you want to run the app locally before deploying:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file** (copy from the example):

   ```bash
   cp .env.example .env
   ```

   Then fill in your values:
   ```
   OPENAI_API_KEY=sk-your-key
   OPENAI_PROMPT_ID=pmpt_your-prompt-id
   EXPO_PUBLIC_DOMAIN=localhost:5000
   ```

3. **Start the servers** (two terminals):

   ```bash
   # Terminal 1 — Frontend
   npx expo start --web

   # Terminal 2 — Backend
   npm run server:dev
   ```

4. Open [http://localhost:8081](http://localhost:8081) in your browser.

> Voice uses WebRTC, which only works in the browser (not in React Native simulators).

---

## Project Structure

```
client/              # Expo/React Native frontend
  screens/           # App screens (Home, StorySelection, Session, etc.)
  constants/         # Theme, stories data
  context/           # React contexts (Language, Subscription, Progress)
  navigation/        # React Navigation stack
  components/        # Shared UI components
server/              # Express backend (OpenAI session proxy)
  routes.ts          # API endpoints (/api/token, /health)
  languageConfig.ts  # Language-specific voice settings
prompts/             # Stored prompt templates for OpenAI
attached_assets/     # Story card images
railway.json         # Railway deployment config
.env.example         # Environment variable template
```

## Tech Stack

- **Frontend:** Expo (React Native for Web), React Navigation, Reanimated
- **Voice:** OpenAI Realtime API via WebRTC
- **Backend:** Express 5 + TypeScript
- **Storage:** AsyncStorage (client-side only, no database required)
- **Deployment:** Railway with NIXPACKS builder

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails on Railway | Make sure `EXPO_PUBLIC_DOMAIN` is set **before** the build runs |
| App loads but voice doesn't work | Check that your OpenAI key has Realtime API access and `OPENAI_PROMPT_ID` is set |
| `OPENAI_PROMPT_ID` error | Create a stored prompt at [platform.openai.com/prompts](https://platform.openai.com/prompts) — see Step 2 |
| 401 error from OpenAI | Your API key may be invalid or lack Realtime API permissions |
| CORS errors | If using a custom domain, add it to `ALLOWED_ORIGINS` in your env vars |
| Microphone not working | Make sure you're using a browser (Chrome recommended) and have granted mic permissions |
