# Resend Contact Form Setup Guide

Complete guide for setting up email delivery for the portfolio contact form using Resend.

---

## 📧 What is Resend?

**Resend** is a modern email API service designed for developers. It allows your contact form to send emails reliably and professionally.

### Why Resend?

- ✅ **Free tier**: 100 emails/day, 3,000/month (perfect for portfolio sites)
- ✅ **Modern API**: Simple, developer-friendly integration
- ✅ **Reliable delivery**: High inbox placement rates
- ✅ **No credit card required** for free tier
- ✅ **Professional emails**: HTML-formatted messages with reply-to support
- ✅ **Great documentation**: Easy to set up and maintain

---

## 🎯 When Do You Need This?

### Development Mode (No API Key)
- ✅ Contact form works without Resend API key
- ✅ Form submissions logged to console
- ✅ Perfect for testing and development
- ⚠️ **No actual emails sent**

### Production Mode (API Key Required)
- ✅ Actual emails delivered to your inbox
- ✅ Professional HTML-formatted messages
- ✅ Visitors can reach you via contact form
- ✅ Reply directly from your email client

**Recommendation**: Set up Resend before deploying to production.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Resend Account

1. Go to [resend.com/signup](https://resend.com/signup)
2. Sign up with your email (or GitHub/Google)
3. Verify your email address
4. You'll be redirected to the Resend dashboard

### Step 2: Generate API Key

1. In the Resend dashboard, navigate to **API Keys** section
2. Click **"Create API Key"**
3. Configure your API key:
   - **Name**: `Portfolio Contact Form` (or any descriptive name)
   - **Permission**: `Sending access` (default - required)
   - **Domain** (optional): Leave as "All Domains" or select specific domain
4. Click **"Create"**
5. **IMPORTANT**: Copy your API key immediately!
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again
   - If lost, create a new one

### Step 3: Add to Environment Variables

#### Local Development

Create a `.env` file in your project root:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

#### Production Deployment

Add the environment variable to your hosting platform:

**Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add new variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production (and Preview if desired)
4. Click **Save**
5. **Redeploy** your application

**Netlify:**
1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. **Key**: `RESEND_API_KEY`
4. **Value**: `re_your_actual_api_key_here`
5. Click **Save**
6. **Trigger a new deploy**

**Cloudflare Pages:**
1. Go to project **Settings** → **Environment variables**
2. Add variable:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production
3. Click **Save**
4. **Redeploy**

### Step 4: Test the Contact Form

1. Visit your portfolio homepage
2. Scroll to the **Contact** section
3. Fill out the form with test data
4. Click **"Send Message"**
5. Check your inbox (`binsarjr@gmail.com` by default)
6. You should receive an email with:
   - Sender's name and email
   - Subject line
   - Message content
   - Reply-to configured (click reply to respond directly)

---

## 🎨 Customization

### Change Recipient Email

Edit `src/routes/+page.server.ts`:

```typescript
// Line ~102
to: 'your.email@example.com', // Change this to your email
```

### Change "From" Email Domain

By default, the form uses Resend's test domain (`onboarding@resend.dev`). For production with your own domain:

1. **Add and verify your domain** in Resend dashboard:
   - Go to **Domains** → **Add Domain**
   - Follow DNS verification steps
   - Wait for verification (usually 5-10 minutes)

2. **Update the form action** in `src/routes/+page.server.ts`:
   ```typescript
   from: 'contact@yourdomain.com', // Use your verified domain
   ```

### Customize Email Template

The email HTML is in `src/routes/+page.server.ts` around line 106. You can customize:

- Colors and styling
- Layout and structure
- Add your logo
- Include signature
- Add social media links

---

## 📊 Monitoring & Limits

### Free Tier Limits

- **100 emails per day**
- **3,000 emails per month**
- **No credit card required**

This is more than enough for a portfolio contact form!

### Check Usage

1. Go to [Resend Dashboard](https://resend.com/home)
2. View **Email Activity** to see:
   - Emails sent
   - Delivery status
   - Open rates (if tracking enabled)
   - Click rates

### Rate Limiting

The contact form includes built-in rate limiting:
- **3 submissions per hour per IP address**
- Prevents spam and abuse
- Configurable in `src/routes/+page.server.ts`

---

## 🔒 Security Best Practices

### ✅ DO:
- Store API key in environment variables only
- Add `.env` to `.gitignore` (already done)
- Rotate API keys periodically (every 3-6 months)
- Use different API keys for development and production
- Monitor email activity for suspicious patterns

### ❌ DON'T:
- Commit API keys to version control
- Share API keys publicly
- Hardcode API keys in source code
- Use the same API key across multiple projects
- Ignore unusual email activity

### If Your API Key is Exposed

1. **Immediately delete** the compromised key in Resend dashboard
2. **Generate a new API key**
3. **Update** environment variables in all deployments
4. **Check** email activity for unauthorized usage
5. **Rotate** any other potentially exposed secrets

---

## 🐛 Troubleshooting

### Form Submits But No Email Received

**Check 1: API Key Configuration**
```bash
# Verify API key is set
echo $RESEND_API_KEY

# Should output: re_xxxxxxxxxx
# If empty, API key is not configured
```

**Check 2: Server Logs**
Look for console messages:
- ✅ `✅ Contact form email sent successfully: [message-id]` → Email sent
- ❌ `❌ RESEND_API_KEY not configured` → Missing API key
- ❌ `❌ Resend API error: [error]` → API issue

**Check 3: Spam Folder**
Check your spam/junk folder. Mark emails as "Not Spam" to improve future delivery.

**Check 4: Email Address**
Verify recipient email in `src/routes/+page.server.ts` is correct.

### "Development Mode" Warning Shows in Production

**Cause**: `RESEND_API_KEY` not set in production environment.

**Fix**:
1. Add the API key to your hosting platform's environment variables
2. Redeploy your application
3. The warning should disappear

### "Too Many Submissions" Error

**Cause**: Rate limit exceeded (3 submissions per hour per IP).

**Fix**:
- Wait 1 hour before submitting again
- To adjust limit, edit `src/routes/+page.server.ts`:
  ```typescript
  const maxSubmissions = 5; // Increase from 3 to 5
  ```

### Honeypot Field Triggering

**Cause**: Bots are filling the hidden "website" field.

**Effect**: Submissions silently fail (returns success to hide honeypot).

**Fix**: No action needed - this is working as intended to block spam.

---

## 💡 Advanced Configuration

### Add Email Tracking

Enable open and click tracking in `src/routes/+page.server.ts`:

```typescript
await resend.emails.send({
  // ... existing config
  tags: [
    { name: 'category', value: 'contact-form' }
  ],
  headers: {
    'X-Entity-Ref-ID': Date.now().toString()
  }
});
```

### Custom Rate Limiting

Replace in-memory rate limiting with Redis (for multi-instance deployments):

```typescript
// Install: bun add ioredis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function isRateLimited(identifier: string): Promise<boolean> {
  const key = `ratelimit:contact:${identifier}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 hour
  }

  return count > 3;
}
```

### Send Confirmation Email to User

Add a second email after successful submission:

```typescript
// Send confirmation to user
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: email, // User's email
  subject: 'Thanks for reaching out!',
  html: `
    <p>Hi ${name},</p>
    <p>Thanks for your message! I'll get back to you as soon as possible.</p>
    <p>Best regards,<br>Binsar Dwi Jasuma</p>
  `
});
```

---

## 📚 Additional Resources

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **API Reference**: [resend.com/docs/api-reference](https://resend.com/docs/api-reference)
- **Resend Status**: [status.resend.com](https://status.resend.com)
- **Support**: [resend.com/support](https://resend.com/support)
- **Resend GitHub**: [github.com/resend](https://github.com/resend)

---

## ❓ FAQ

### Do I need a custom domain?

**No.** The free tier includes access to `onboarding@resend.dev`, which works great for development and testing. For production, a custom domain looks more professional but is optional.

### Can I use a different email service?

**Yes.** The form action is generic. You can replace Resend with:
- SendGrid
- Mailgun
- AWS SES
- Postmark
- Or any SMTP service

Just update the email sending logic in `src/routes/+page.server.ts`.

### How much does Resend cost?

**Free tier**: 3,000 emails/month
**Paid plans**: Start at $20/month for 50,000 emails

For a portfolio, free tier is usually sufficient.

### Can I see when emails are opened?

**Yes**, if you add email tracking (see Advanced Configuration section above).

### What happens if I exceed the free tier limit?

Resend will stop sending emails until:
1. The next billing period (monthly limit)
2. The next day (daily limit)
3. You upgrade to a paid plan

You'll receive a notification email when approaching limits.

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Resend account created and email verified
- [ ] API key generated and copied
- [ ] Environment variable `RESEND_API_KEY` set in production
- [ ] Production application redeployed
- [ ] Test form submission sent successfully
- [ ] Email received in your inbox
- [ ] Reply-to functionality tested
- [ ] Spam folder checked (mark as Not Spam if needed)
- [ ] Rate limiting tested (try 4 submissions in quick succession)
- [ ] Error handling tested (submit with invalid data)
- [ ] Mobile form tested
- [ ] No "Development mode" warning in production

---

## 🎉 You're All Set!

Your contact form is now fully functional and ready to receive messages from visitors!

If you encounter any issues not covered in this guide, check:
1. Resend dashboard for email activity
2. Browser console for client-side errors
3. Server logs for backend errors
4. This documentation's troubleshooting section

Happy building! 🚀
