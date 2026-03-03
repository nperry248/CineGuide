# CineGuide

An AI-powered movie discovery app. Describe your mood in plain English and CineGuide finds movies that match — complete with streaming availability, ratings, and full details.

```
"cozy rainy Sunday, something nostalgic"
"can't sleep, mind-bending thriller"
"date night, romantic but not cheesy"
```

## How It Works

1. You type a vibe or mood in natural language
2. Google Gemini interprets it into structured filters (genres, era, rating threshold)
3. TMDB returns matching movies with posters and ratings
4. Watch providers are fetched in parallel — see exactly what's on Netflix, Hulu, etc.
5. Click any movie for full details: runtime, tagline, genres, overview, and streaming services

## Stack

- **React + Vite** — frontend
- **Google Gemini** — natural language → movie filters
- **TMDB API** — movie data, posters, watch providers

## Running Locally

**1. Clone and install**
```bash
git clone https://github.com/nperry248/CineGuide.git
cd CineGuide
npm install
```

**2. Set up environment variables**

Copy `.env.example` to `.env` and fill in your keys:
```
VITE_GEMINI_API_KEY=your_gemini_key
VITE_TMDB_API_KEY=your_tmdb_key
```

- Gemini key: [Google AI Studio](https://aistudio.google.com/)
- TMDB key: [themoviedb.org](https://www.themoviedb.org/settings/api)

**3. Run**
```bash
npm run dev
```
