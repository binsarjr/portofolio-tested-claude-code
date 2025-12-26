# Monkeytype Integration Setup Guide

This portfolio now features **real-time typing statistics** from Monkeytype! The Skills page displays live data including WPM (words per minute), accuracy, tests completed, and personal bests.

## 🚀 Quick Setup

### 1. Get Your Monkeytype API Key

1. Go to [Monkeytype](https://monkeytype.com)
2. Log in to your account (or create one if you haven't)
3. Click your profile icon → **Settings**
4. Navigate to **Account** section
5. Find **"Generate ApeKey"** button
6. Click it and copy the generated API key

### 2. Configure Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`):

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your Monkeytype API key:

```env
MONKEYTYPE_API_KEY=your_actual_monkeytype_ape_key_here
```

### 3. Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
# Then start it again
bun run dev
```

That's it! Visit `/skills` and you'll see your **real-time** Monkeytype stats! 🎉

## 📊 What Data is Fetched?

The integration fetches the following from Monkeytype API:

- **Average WPM**: Calculated from your recent 60-second tests (up to 10 most recent)
- **Accuracy**: Your average accuracy percentage
- **Highest WPM**: Your best performance ever
- **Tests Completed**: Total number of typing tests you've completed

## 🔒 Rate Limits

Monkeytype API has the following rate limits:

- **60 requests per hour** for user stats endpoint
- **60 requests per hour** for personal bests endpoint
- **100 requests per hour** for user profile endpoint

The portfolio fetches data server-side during page load, so under normal usage, you won't hit these limits.

## 🛡️ Privacy & Security

- Your API key is stored in the `.env` file (which is `.gitignore`d and won't be committed)
- All API calls are made server-side, so your key is never exposed to the client
- Only public stats are fetched (no private data)

## 🔄 Fallback Mode

If you **don't** configure an API key, the portfolio will:
- Display static placeholder stats
- Show a "Static" badge to indicate the data isn't live
- Still look great! (fallback data is hardcoded)

This means the site works perfectly fine without the API key, but you get the cool real-time feature when configured.

## 🐛 Troubleshooting

### Stats not updating?

1. Make sure your `.env` file exists and contains the correct API key
2. Check that you've restarted the dev server after adding the key
3. Verify your Monkeytype account has completed some tests
4. Check browser console or server logs for error messages

### Getting "Static" badge even after adding API key?

1. Double-check your API key doesn't have extra spaces
2. Make sure the key is not the placeholder `your_monkeytype_ape_key_here`
3. Verify the key is named exactly `MONKEYTYPE_API_KEY` in `.env`

### API rate limit errors?

- The integration caches data server-side via SvelteKit's load function
- If you're seeing rate limit errors, try refreshing less frequently
- Consider the 60/hour limit when developing

## 🎨 UI Features

When real-time data is active:

- ✅ **"Real-time stats from Monkeytype"** subtitle
- ✅ Link icon button to visit Monkeytype
- ✅ Loading skeletons during navigation
- ✅ Smooth data updates

When using fallback data:

- ℹ️ **"Static"** badge indicator
- ℹ️ **"Measured on Monkeytype"** subtitle
- ✅ Same UI design and link

## 📚 API Documentation

For more details about the Monkeytype API:
- Official docs: https://api.monkeytype.com/docs/
- API status: https://monkeytype.instatus.com/public-api

## 🚧 Future Enhancements

Possible improvements for future iterations:

- [ ] Add user profile link with username
- [ ] Display streak data
- [ ] Show test activity graph
- [ ] Add more granular stats (15s, 30s, 120s modes)
- [ ] Cache data client-side for better performance
- [ ] Add manual refresh button
