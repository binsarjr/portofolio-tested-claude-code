# GitHub Token Setup Guide

This guide explains how to set up a GitHub Personal Access Token (PAT) to increase API rate limits for your portfolio website.

## Why Use a GitHub Token?

### Rate Limits
- **Without token**: 60 requests/hour (unauthenticated)
- **With token**: 5000 requests/hour (authenticated)

### Benefits
✅ **More reliable**: Higher traffic won't hit rate limits
✅ **Better performance**: Can handle many simultaneous visitors
✅ **Optional**: Site works fine without it, just with lower rate limits
✅ **Secure**: Token stays on server, never exposed to browsers

## Setup Instructions

### 1. Generate GitHub Personal Access Token

1. Go to [GitHub Token Settings](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure your token:
   - **Note**: `Portfolio API Access` (or any descriptive name)
   - **Expiration**: Choose expiration (recommend: 90 days or No expiration)
   - **Scopes**: ⚠️ **NO SCOPES NEEDED** - Leave all checkboxes unchecked
     - This is a read-only token for public data
     - No repository or user access needed
4. Click **"Generate token"** at the bottom
5. **Copy the token immediately** - you won't be able to see it again!

### 2. Add Token to `.env` File

1. Open your `.env` file (create one if it doesn't exist)
2. Add or update the `GITHUB_TOKEN` line:

```bash
GITHUB_TOKEN=ghp_yourActualTokenHere1234567890
```

3. Save the file

**Important**: The `.env` file is in `.gitignore` and will NOT be committed to version control.

### 3. Verify Setup

You can verify the token is working by checking the server logs when you visit the portfolio:

```bash
bun run dev
```

Visit:
- http://localhost:5173/projects
- http://localhost:5173/activity

If the GitHub API returns data successfully, your token is working!

## Checking Rate Limit Status

You can check your current rate limit status at any time:

```bash
# Without authentication
curl https://api.github.com/rate_limit

# With authentication (replace with your token)
curl -H "Authorization: Bearer ghp_yourToken" https://api.github.com/rate_limit
```

Look for the `rate` → `limit` field:
- `60` = unauthenticated
- `5000` = authenticated (your token is working)

## How It Works

The portfolio uses the token automatically when configured:

1. **Server-side only**: Token is read from environment variables via `$env/static/private`
2. **Never exposed**: Token stays on the server, never sent to browsers
3. **Graceful fallback**: If token is invalid/missing, falls back to unauthenticated mode
4. **Backward compatible**: Works with placeholder value `your_github_personal_access_token`

## Security Best Practices

✅ **DO**:
- Keep your token secret
- Use minimal scopes (none needed for public data)
- Set expiration dates and rotate tokens
- Store token only in `.env` (which is gitignored)

❌ **DON'T**:
- Commit `.env` file to git
- Share your token publicly
- Use tokens with unnecessary scopes
- Hardcode tokens in source code

## Troubleshooting

### Token Not Working

If data still isn't loading:

1. **Check token format**: Should start with `ghp_` (classic token) or `github_pat_` (fine-grained)
2. **Verify `.env` file**: Make sure `GITHUB_TOKEN=ghp_...` has no quotes or extra spaces
3. **Restart dev server**: Changes to `.env` require server restart
4. **Check expiration**: Token may have expired - generate a new one

### Rate Limit Still Low

Run the rate limit check command above. If it shows `60`:
- Token may not be loaded correctly
- Token may be invalid/expired
- Server might not have restarted after adding token

### Site Still Works but with Errors

The site gracefully falls back to:
- Unauthenticated API calls (if token invalid)
- Static fallback data (if API fails completely)

This is intentional - the portfolio works even without a token, just with reduced reliability.

## Deployment

When deploying to production:

1. **Add environment variable** to your hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Cloudflare Pages**: Settings → Environment Variables

2. **Name**: `GITHUB_TOKEN`
3. **Value**: Your token (starts with `ghp_` or `github_pat_`)
4. **Scope**: All environments (or Production only)

## Optional: Fine-Grained Tokens (Advanced)

GitHub now offers fine-grained tokens with more granular permissions:

1. Go to [GitHub Tokens](https://github.com/settings/tokens?type=beta)
2. Click **"Generate new token"** → **"Fine-grained token"**
3. Configure:
   - **Repository access**: Public Repositories (read-only)
   - **Permissions**: None needed (just access to public data)
4. Generate and copy token

Fine-grained tokens start with `github_pat_` instead of `ghp_`.

## Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs for error messages
3. Test with the rate limit check command
4. Try generating a new token if the old one seems invalid

---

**Remember**: The GitHub token is **optional**. Your portfolio works without it, just with a lower rate limit (60/hour instead of 5000/hour).
