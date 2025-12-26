# Vercel Analytics Setup Guide

This portfolio uses **Vercel Analytics** to track page views and user interactions. Vercel Analytics is privacy-friendly, requires no cookies, and is fully GDPR compliant.

## Features

- 📊 **Real-time Analytics**: Track page views, unique visitors, and navigation patterns
- 🔒 **Privacy-First**: No cookies, no user tracking, GDPR compliant
- ⚡ **Lightweight**: Minimal performance impact (~1.5 KB gzipped)
- 🎯 **Automatic**: Tracks page views and route changes automatically
- 🆓 **Free Tier**: Up to 100,000 events/month on Vercel's free plan

## How It Works

Analytics are automatically initialized in the root layout (`src/routes/+layout.svelte`):

```typescript
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();
```

This single call tracks:
- Page views on all routes (`/`, `/projects`, `/skills`, `/activity`)
- Client-side navigation (SvelteKit's page transitions)
- User sessions and unique visitors
- Geographic data (country-level, not IP addresses)

## Deployment Setup

### 1. Deploy to Vercel

If you haven't already, deploy your portfolio to Vercel:

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository through the [Vercel Dashboard](https://vercel.com/new).

### 2. Enable Analytics

1. Go to your project dashboard on [Vercel](https://vercel.com)
2. Navigate to the **Analytics** tab
3. Click **Enable Analytics**
4. That's it! Analytics will start collecting data on your next deployment

### 3. View Analytics Dashboard

Access your analytics at: `https://vercel.com/[your-username]/[project-name]/analytics`

You'll see:
- **Page Views**: Total views and unique visitors
- **Top Pages**: Most visited routes
- **Referrers**: Where visitors come from
- **Countries**: Geographic distribution
- **Devices**: Desktop vs mobile breakdown

## Development vs Production

- **Development** (`bun run dev`): Analytics are disabled automatically in dev mode
- **Preview** (`vercel`): Analytics work on preview deployments
- **Production** (`vercel --prod`): Full analytics enabled

## Privacy Compliance

Vercel Analytics is compliant with:
- ✅ GDPR (EU General Data Protection Regulation)
- ✅ CCPA (California Consumer Privacy Act)
- ✅ PECR (UK Privacy and Electronic Communications Regulations)

**No consent banner required** because:
- No cookies are used
- No personal data is collected
- No cross-site tracking
- Data is aggregated and anonymized

## Alternative: Vercel Web Analytics

For enhanced analytics with Web Vitals (Core Web Vitals tracking), you can upgrade to **Vercel Web Analytics**:

```bash
bun remove @vercel/analytics
bun add @vercel/web-analytics
```

Then update `src/routes/+layout.svelte`:

```typescript
import { webVitals } from '@vercel/web-analytics';

webVitals({
  path: '', // Current route
  params: {}, // Custom parameters
  debug: false
});
```

Web Analytics includes:
- Core Web Vitals (LCP, FID, CLS, TTFB, INP)
- Speed insights
- Performance scores
- Real user monitoring (RUM)

## Custom Events (Optional)

Track custom events like button clicks or form submissions:

```typescript
import { track } from '@vercel/analytics';

// Example: Track contact form submissions
track('contact_form_submit', {
  location: 'homepage'
});

// Example: Track project card clicks
track('project_click', {
  project: 'repository-name',
  language: 'TypeScript'
});
```

## Troubleshooting

### Analytics Not Showing Data

1. **Check if analytics are enabled**: Visit your project's Analytics tab on Vercel
2. **Wait for deployment**: Analytics only work on deployed sites (not localhost)
3. **Wait for data**: Initial data can take 1-2 hours to appear
4. **Check browser**: Some ad blockers may block analytics (test in incognito mode)

### Build Errors

If you see TypeScript errors after adding analytics:

```bash
# Clear cache and rebuild
rm -rf .svelte-kit node_modules
bun install
bun run check
bun run build
```

## Cost

- **Free Tier**: 100,000 events/month (sufficient for most personal portfolios)
- **Pro Plan**: 1,000,000 events/month (if you exceed the free tier)

Most personal portfolios stay well within the free tier limits.

## Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Web Analytics](https://vercel.com/docs/speed-insights/web-analytics)
- [Privacy Policy](https://vercel.com/legal/privacy-policy)

## Removal

To remove analytics:

```bash
bun remove @vercel/analytics
```

Then remove these lines from `src/routes/+layout.svelte`:

```typescript
import { inject } from '@vercel/analytics';
inject();
```
