import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

// Initialize Resend with API key (optional - gracefully handles missing key)
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

// Simple in-memory rate limiting (per session)
// In production, use Redis or database for persistent rate limiting
const submissionTimes = new Map<string, number[]>();

function isRateLimited(identifier: string): boolean {
	const now = Date.now();
	const windowMs = 60 * 60 * 1000; // 1 hour
	const maxSubmissions = 3; // Max 3 submissions per hour

	// Get existing submissions for this identifier
	let times = submissionTimes.get(identifier) || [];

	// Filter out old submissions outside the time window
	times = times.filter(time => now - time < windowMs);

	// Check if limit exceeded
	if (times.length >= maxSubmissions) {
		return true;
	}

	// Add current submission time
	times.push(now);
	submissionTimes.set(identifier, times);

	return false;
}

export const actions: Actions = {
	contact: async ({ request, getClientAddress }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const subject = formData.get('subject')?.toString().trim();
		const message = formData.get('message')?.toString().trim();
		const honeypot = formData.get('website')?.toString(); // Honeypot field

		// Spam protection: Check honeypot field (should be empty)
		if (honeypot) {
			// Silently fail for bots - return success to avoid revealing honeypot
			return { success: true };
		}

		// Validation
		if (!name || name.length < 2 || name.length > 100) {
			return fail(400, {
				error: 'Please provide a valid name (2-100 characters)',
				field: 'name',
				values: { name, email, subject, message }
			});
		}

		if (!email || !email.includes('@') || email.length > 255) {
			return fail(400, {
				error: 'Please provide a valid email address',
				field: 'email',
				values: { name, email, subject, message }
			});
		}

		if (!subject || subject.length < 3 || subject.length > 200) {
			return fail(400, {
				error: 'Please provide a subject (3-200 characters)',
				field: 'subject',
				values: { name, email, subject, message }
			});
		}

		if (!message || message.length < 10 || message.length > 5000) {
			return fail(400, {
				error: 'Please provide a message (10-5000 characters)',
				field: 'message',
				values: { name, email, subject, message }
			});
		}

		// Rate limiting
		const clientIp = getClientAddress();
		if (isRateLimited(clientIp)) {
			return fail(429, {
				error: 'Too many submissions. Please try again later (max 3 per hour)',
				values: { name, email, subject, message }
			});
		}

		// Check if Resend is configured
		if (!resend) {
			console.error('❌ RESEND_API_KEY not configured - form submission logged but email not sent');
			console.log('📧 Contact Form Submission:', { name, email, subject, message });

			// Return success with a note (for development without API key)
			return {
				success: true,
				devMode: true,
				message: 'Form submitted successfully (development mode - email not sent)'
			};
		}

		try {
			// Send email using Resend
			const { data, error } = await resend.emails.send({
				from: 'Portfolio Contact <onboarding@resend.dev>', // Resend test domain
				to: 'binsarjr@gmail.com', // Your email
				replyTo: email, // Visitor's email for easy reply
				subject: `Portfolio Contact: ${subject}`,
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
							New Contact Form Submission
						</h2>

						<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
							<p><strong>From:</strong> ${name}</p>
							<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
							<p><strong>Subject:</strong> ${subject}</p>
						</div>

						<div style="background: white; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
							<h3 style="margin-top: 0; color: #333;">Message:</h3>
							<p style="white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
						</div>

						<div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-radius: 8px; font-size: 14px;">
							<p style="margin: 0; color: #0369a1;">
								💡 <strong>Quick Reply:</strong> Simply reply to this email to respond directly to ${name}.
							</p>
						</div>

						<p style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #e5e5e5; padding-top: 15px;">
							Sent from your portfolio contact form at binsarjr.com
						</p>
					</div>
				`,
			});

			if (error) {
				console.error('❌ Resend API error:', error);
				return fail(500, {
					error: 'Failed to send message. Please try contacting via email directly.',
					values: { name, email, subject, message }
				});
			}

			console.log('✅ Contact form email sent successfully:', data?.id);

			return {
				success: true,
				message: 'Message sent successfully! I\'ll get back to you soon.'
			};

		} catch (error) {
			console.error('❌ Unexpected error sending email:', error);
			return fail(500, {
				error: 'An unexpected error occurred. Please try again or contact me directly via email.',
				values: { name, email, subject, message }
			});
		}
	}
};
