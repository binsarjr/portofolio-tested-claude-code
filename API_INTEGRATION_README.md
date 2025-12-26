# API Integration Guide

This portfolio includes optional integrations with GitHub and Monkeytype APIs to display real-time data. This guide explains how to set up and use these integrations.

## Quick Start

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your API keys to `.env` (optional, but recommended)

3. Run the development server:
   ```bash
   bun run dev
   ```

## Environment Variables

### GitHub Token (Optional but Recommended)

**Benefits:**
- Increases API rate limit from 60 requests/hour to 5000 requests/hour
- More reliable data fetching for Projects and Activity pages
- No functional changes, just better rate limits

**Setup:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set a name (e.g., "Portfolio API")
4. Select scopes: **Only `public_repo`** (read-only access to public repos)
5. Generate token and copy it
6. Add to `.env`:
   ```env
   GITHUB_TOKEN=ghp_yourTokenHere
   ```

**Without token:** The portfolio still works perfectly, using the public GitHub API (60 req/hr limit)

### Monkeytype Ape Key (Optional)

**Benefits:**
- Displays real-time typing statistics on the Skills page
- Shows actual WPM, accuracy, and tests completed from your Monkeytype account

**Setup:**
1. Go to https://monkeytype.com/account
2. Scroll to "Ape Keys" section
3. Generate a new key
4. Add to `.env`:
   ```env
   MONKEYTYPE_APE_KEY=your-ape-key-here
   ```

**Without key:** The Skills page shows static placeholder typing stats

## Features

### GitHub Integration

**Endpoints Used:**
- `GET /users/binsarjr` - User profile data
- `GET /users/binsarjr/repos` - Repository list

**Pages Affected:**
- `/projects` - Shows all repositories with stars, forks, languages
- `/activity` - Shows GitHub stats, contribution graph, recent repos

**Rate Limits:**
- Without token: 60 requests/hour
- With token: 5000 requests/hour

**Error Handling:**
- Graceful fallback to static data if API fails
- User-friendly error messages
- Retry functionality on error pages

### Monkeytype Integration

**Endpoints Used:**
- `GET /users/personalBests` - Typing test personal bests
- `GET /users/profile` - User profile and typing stats

**Page Affected:**
- `/skills` - Typing Performance card

**Data Displayed:**
- Average WPM (from last 10 tests at 60s)
- Accuracy percentage
- Highest WPM achieved
- Total tests completed

**Rate Limits:**
- 60 requests/hour per Ape Key

**Error Handling:**
- Falls back to static data if API fails
- Badge indicator shows "Live Data" vs "Static Data"

## OG Image Generation

The portfolio includes an Open Graph image for social media sharing.

**Files:**
- `static/og-image.svg` - Editable SVG template
- `static/og-image.png` - Generated PNG (1200x630px)

**Regenerating OG Image:**
```bash
bun run og-image
```

This uses Puppeteer to convert the SVG to PNG. Useful if you update the SVG template.

## Development

### Type Checking
```bash
bun run check
```

### Build Production
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

## Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **GitHub token scopes** - Only grant `public_repo` (read-only)
3. **Monkeytype key** - Only used for fetching your own stats
4. **Environment variables** - Only accessible server-side, never exposed to client

## Troubleshooting

### "Failed to Load Activity Data" error
- Check if you're hitting GitHub's rate limit (60/hr without token)
- Add `GITHUB_TOKEN` to `.env` to increase limit to 5000/hr
- Verify GitHub API is accessible (check https://www.githubstatus.com/)

### "Static Data" badge on Skills page
- This is normal if `MONKEYTYPE_APE_KEY` is not configured
- Add the key to `.env` to see real-time data

### Build errors about environment variables
- Make sure you're using `$env/dynamic/private`, not `$env/static/private`
- Environment variables are optional - code handles missing values gracefully

## API Documentation

- **GitHub REST API**: https://docs.github.com/en/rest
- **Monkeytype API**: https://api.monkeytype.com/docs/

## Need Help?

Check the main README.md or open an issue on GitHub.
