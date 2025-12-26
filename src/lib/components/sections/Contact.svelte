<script lang="ts">
	import Card from '../ui/Card.svelte';
	import Input from '../ui/Input.svelte';
	import Textarea from '../ui/Textarea.svelte';
	import Button from '../ui/Button.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/binsarjr',
			icon: 'github',
			username: '@binsarjr'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/binsar-dwi-jasuma',
			icon: 'linkedin',
			username: 'Binsar Dwi Jasuma'
		},
		{
			name: 'Email',
			url: 'mailto:binsarjr@gmail.com',
			icon: 'mail',
			username: 'binsarjr@gmail.com'
		}
	];

	function getIcon(name: string) {
		const icons = {
			github:
				'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z',
			linkedin:
				'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z',
			mail: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z'
		};
		return icons[name as keyof typeof icons] || '';
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			// Simulate form submission - replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// TODO: Implement actual form submission
			// Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

			submitStatus = 'success';
			formData = { name: '', email: '', subject: '', message: '' };
		} catch (error) {
			submitStatus = 'error';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;

			// Reset status after 5 seconds
			setTimeout(() => {
				submitStatus = 'idle';
			}, 5000);
		}
	}
</script>

<section id="contact" class="contact {className}">
	<div class="contact-content">
		<h2 class="section-title">Get In Touch</h2>
		<p class="section-subtitle">
			Have a project in mind or just want to chat? Feel free to reach out through
			the form below or connect with me on social media.
		</p>

		<div class="contact-grid">
			<div class="contact-form-wrapper">
				<Card class="contact-form-card">
					<form onsubmit={handleSubmit} class="contact-form">
						<div class="form-group">
							<label for="name" class="form-label">Name</label>
							<Input
								id="name"
								bind:value={formData.name}
								placeholder="Your name"
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="email" class="form-label">Email</label>
							<Input
								id="email"
								type="email"
								bind:value={formData.email}
								placeholder="your.email@example.com"
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="subject" class="form-label">Subject</label>
							<Input
								id="subject"
								bind:value={formData.subject}
								placeholder="What's this about?"
								required
								disabled={isSubmitting}
							/>
						</div>

						<div class="form-group">
							<label for="message" class="form-label">Message</label>
							<Textarea
								id="message"
								bind:value={formData.message}
								placeholder="Your message..."
								rows={6}
								required
								disabled={isSubmitting}
							/>
						</div>

						{#if submitStatus === 'success'}
							<div class="form-message success">
								✓ Message sent successfully! I'll get back to you soon.
							</div>
						{/if}

						{#if submitStatus === 'error'}
							<div class="form-message error">
								✗ Failed to send message. Please try again or contact me directly via email.
							</div>
						{/if}

						<Button type="submit" size="lg" disabled={isSubmitting} class="submit-button">
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</Button>
					</form>
				</Card>
			</div>

			<div class="contact-info">
				<h3 class="info-title">Connect With Me</h3>
				<p class="info-description">
					I'm always open to discussing new projects, creative ideas, or opportunities
					to be part of your visions.
				</p>

				<div class="social-links">
					{#each socialLinks as social (social.name)}
						<a href={social.url} target="_blank" rel="noopener noreferrer" class="social-link" data-sveltekit-reload>
							<div class="social-icon">
								<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
									<path d={getIcon(social.icon)} />
								</svg>
							</div>
							<div class="social-info">
								<div class="social-name">{social.name}</div>
								<div class="social-username">{social.username}</div>
							</div>
						</a>
					{/each}
				</div>

				<div class="availability">
					<div class="availability-indicator"></div>
					<span>Available for freelance projects</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		padding: 6rem 1rem;
		background: var(--color-background);
	}

	.contact-content {
		max-width: 1280px;
		margin: 0 auto;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		text-align: center;
		color: var(--color-foreground);
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--color-muted-foreground);
		text-align: center;
		max-width: 42rem;
		margin: 0 auto 3rem;
		line-height: 1.6;
	}

	.contact-grid {
		display: grid;
		gap: 3rem;
	}

	.contact-form-wrapper :global(.contact-form-card) {
		padding: 2rem;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-foreground);
	}

	.form-message {
		padding: 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.form-message.success {
		background: rgba(34, 197, 94, 0.1);
		color: rgb(34, 197, 94);
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.form-message.error {
		background: rgba(239, 68, 68, 0.1);
		color: rgb(239, 68, 68);
		border: 1px solid rgba(239, 68, 68, 0.2);
	}

	.contact-form :global(.submit-button) {
		width: 100%;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-foreground);
	}

	.info-description {
		color: var(--color-muted-foreground);
		line-height: 1.6;
		margin-top: -1rem;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border);
		background: var(--color-card);
		text-decoration: none;
		transition: all 0.2s;
	}

	.social-link:hover {
		border-color: var(--color-primary);
		background: rgba(59, 130, 246, 0.05);
	}

	.social-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		background: var(--color-primary);
		color: white;
		flex-shrink: 0;
	}

	.social-info {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.social-name {
		font-weight: 500;
		color: var(--color-foreground);
	}

	.social-username {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
	}

	.availability {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		color: rgb(34, 197, 94);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.availability-indicator {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: rgb(34, 197, 94);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@media (min-width: 768px) {
		.contact {
			padding: 8rem 2rem;
		}

		.section-title {
			font-size: 3rem;
		}

		.section-subtitle {
			font-size: 1.25rem;
			margin-bottom: 4rem;
		}

		.contact-grid {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}
	}
</style>
