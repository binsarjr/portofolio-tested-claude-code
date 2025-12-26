# GitHub API Token Setup Guide

This guide will help you set up a GitHub Personal Access Token (PAT) for your portfolio to enable higher API rate limits.

## Why Do You Need This?

Your portfolio fetches data from GitHub's API to display:
- Your repositories on the **Projects** page
- Your activity statistics on the **Activity** page

### Rate Limits

| Authentication | Rate Limit | Best For |
|---------------|------------|----------|
| **No Token** | 60 requests/hour per IP | Development only |
| **With Token** | 5000 requests/hour | Production deployments |

**Important:** Without a token, your portfolio shares the 60 requests/hour limit with all visitors from the same IP address. This can cause the GitHub API to fail during normal usage.

---

## Step-by-Step Setup

### 1. Generate Your GitHub Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Or navigate: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Click "Generate new token (classic)"**
   - Choose "classic" token (not fine-grained)

3. **Configure Your Token**
   - **Note/Name**: `Portfolio API Access` (or any descriptive name)
   - **Expiration**: Choose based on your needs:
     - `90 days` - Recommended for testing
     - `No expiration` - For production (requires periodic security review)

4. **Select Scopes (Permissions)**

   **IMPORTANT:** Only select these scopes (minimal permissions):

   - ✅ **`public_repo`** - Access public repositories
     - This is the **ONLY** scope you need
     - Provides read-only access to public repositories

   **DO NOT** select:
   - ❌ `repo` (full access) - Too broad
   - ❌ `admin` scopes - Unnecessary
   - ❌ `user` scopes - Not needed
   - ❌ `delete` scopes - Dangerous

5. **Generate Token**
   - Click the green "Generate token" button at the bottom
   - **CRITICAL:** Copy the token immediately - you won't see it again!
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 2. Add Token to Your Environment

#### For Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```bash
   # Replace with your actual token
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

3. **Verify `.env` is in `.gitignore`:**
   ```bash
   # This should already be done, but double-check:
   cat .gitignore | grep .env
   ```
   If you don't see `.env` listed, add it to prevent accidentally committing your token.

#### For Production Deployment

The process varies by hosting platform:

##### Vercel
1. Go to your project settings
2. Navigate to: Settings → Environment Variables
3. Add new variable:
   - **Key:** `GITHUB_TOKEN`
   - **Value:** Your token (e.g., `ghp_xxxx...`)
   - **Environment:** Production (and Preview if needed)
4. Redeploy your application

##### Netlify
1. Go to your site settings
2. Navigate to: Site settings → Build & deploy → Environment
3. Click "Edit variables"
4. Add:
   - **Key:** `GITHUB_TOKEN`
   - **Value:** Your token
5. Redeploy your application

##### Cloudflare Pages
1. Go to your project settings
2. Navigate to: Settings → Environment variables
3. Add variable for Production
4. Redeploy your application

##### Other Platforms
Consult your hosting platform's documentation on how to set environment variables.

---

### 3. Verify It's Working

#### Local Testing

1. **Start your development server:**
   ```bash
   bun run dev
   ```

2. **Check the console logs:**
   - No token: You'll see warnings about rate limits
   - With token: Requests should complete successfully

3. **Test the pages:**
   - Visit: http://localhost:5173/projects
   - Visit: http://localhost:5173/activity
   - Both should load without errors

#### Production Testing

1. **Deploy your application** with the environment variable set
2. **Open browser developer tools** (F12)
3. **Visit your Projects and Activity pages**
4. **Check the Network tab:**
   - GitHub API requests should return `200 OK`
   - Response headers should show increased rate limits

---

## Security Best Practices

### ✅ DO

- **Keep your token secret** - Never share it publicly
- **Use minimal scopes** - Only `public_repo` is needed
- **Add `.env` to `.gitignore`** - Prevent accidental commits
- **Rotate tokens periodically** - Generate new ones every 90 days
- **Use environment variables** - Never hardcode tokens in source code
- **Review token usage** - Check GitHub's token usage page regularly

### ❌ DON'T

- **Commit tokens to Git** - Even in "private" repositories
- **Share tokens** - Each deployment should have its own token
- **Use `repo` scope** - Too broad, use `public_repo` instead
- **Ignore expiration** - Set reasonable expiration dates
- **Reuse tokens** - Different projects should use different tokens

---

## Troubleshooting

### Problem: "API rate limit exceeded" error

**Cause:** No token configured or token is invalid

**Solution:**
1. Verify `GITHUB_TOKEN` is set in your `.env` file (local) or hosting platform (production)
2. Check the token hasn't expired on https://github.com/settings/tokens
3. Ensure the token has the `public_repo` scope
4. Try regenerating a new token

---

### Problem: "401 Unauthorized" error

**Cause:** Invalid token format or expired token

**Solution:**
1. Check token format: Should start with `ghp_`
2. Verify no extra spaces or quotes in `.env` file
3. Regenerate token at https://github.com/settings/tokens
4. Update environment variable in deployment platform

---

### Problem: Still seeing fallback data on pages

**Cause:** Token not being used or API request failing

**Solution:**
1. Check server logs for error messages
2. Verify environment variable name is exactly `GITHUB_TOKEN`
3. Restart your development server after adding `.env`
4. Redeploy your production app after adding environment variable

---

### Problem: Token exposed in Git history

**Cause:** Accidentally committed `.env` file

**Solution:**
1. **Immediately revoke the token** at https://github.com/settings/tokens
2. Generate a new token
3. Remove the token from Git history:
   ```bash
   # Use git-filter-repo or BFG Repo-Cleaner
   # Or delete and recreate the repository if needed
   ```
4. Ensure `.env` is in `.gitignore` before committing again

---

## Monitoring Your Token

### Check Rate Limit Usage

You can check your current rate limit status:

```bash
# Replace YOUR_TOKEN with your actual token
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.github.com/rate_limit
```

Response will show:
- **limit**: Maximum requests per hour (5000 with token, 60 without)
- **remaining**: Requests remaining in current window
- **reset**: Unix timestamp when the limit resets

---

## Token Lifecycle Management

### When to Regenerate Your Token

1. **Every 90 days** - As a security best practice
2. **If exposed** - Immediately if accidentally committed or shared
3. **When changing scope** - If you need different permissions
4. **Before decommissioning** - When retiring old deployments

### How to Rotate Your Token

1. Generate a new token following Step 1 above
2. Update environment variables in all deployments
3. Test that everything works with the new token
4. Delete the old token from GitHub settings
5. Document the rotation date for future reference

---

## FAQ

**Q: Can I use the same token for multiple projects?**
A: While possible, it's better to generate separate tokens for different projects for better security and monitoring.

**Q: What if I forget to add the token?**
A: Your portfolio will still work, but will use the unauthenticated rate limit (60 requests/hour) and may fail during high traffic.

**Q: Do I need to restart my app after adding the token?**
A: Yes, for local development, restart `bun run dev`. For production, you need to redeploy.

**Q: Is my token visible in the browser?**
A: No! The token is only used server-side in `+page.server.ts` files and is never sent to the client.

**Q: Can I use fine-grained tokens instead of classic?**
A: Currently, this setup uses classic tokens. Fine-grained tokens work too but require more complex configuration.

---

## Additional Resources

- [GitHub: Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub: Rate limits](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
- [GitHub: Token security best practices](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation)

---

## Support

If you encounter issues not covered in this guide:

1. Check the [GitHub API Status](https://www.githubstatus.com/)
2. Review server logs for detailed error messages
3. Verify your deployment platform's environment variable configuration
4. Test with a freshly generated token

**Last Updated:** December 27, 2025
