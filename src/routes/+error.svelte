<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';

	const { status, message } = $derived({
		status: $page.status,
		message: $page.error?.message || 'An unexpected error occurred'
	});

	const errorTitle = $derived.by(() => {
		switch (status) {
			case 404:
				return 'Page Not Found';
			case 500:
				return 'Internal Server Error';
			case 403:
				return 'Access Forbidden';
			default:
				return 'Error';
		}
	});

	const errorDescription = $derived.by(() => {
		switch (status) {
			case 404:
				return "The page you're looking for doesn't exist. It might have been moved or deleted.";
			case 500:
				return 'Something went wrong on our end. Please try again later.';
			case 403:
				return "You don't have permission to access this page.";
			default:
				return 'An unexpected error occurred. Please try again.';
		}
	});
</script>

<svelte:head>
	<title>{errorTitle} - Binsar Dwi Jasuma</title>
	<meta name="description" content={errorDescription} />
</svelte:head>

<section class="error-page">
	<div class="error-container">
		<div class="error-content">
			<!-- Status Code Display -->
			<div class="status-code">
				{status}
			</div>

			<!-- Error Title -->
			<h1 class="error-title">
				{errorTitle}
			</h1>

			<!-- Error Description -->
			<p class="error-description">
				{errorDescription}
			</p>

			<!-- Navigation Options -->
			<div class="error-actions">
				<Button href="/" variant="primary" size="lg">
					Go Home
				</Button>
				<Button href="/projects" variant="secondary" size="lg">
					View Projects
				</Button>
			</div>

			<!-- Helpful Links -->
			<div class="helpful-links">
				<p class="links-title">Or explore these pages:</p>
				<div class="links-grid">
					<a href="/skills" class="helpful-link">
						<span class="link-icon">⚡</span>
						<span>Skills</span>
					</a>
					<a href="/activity" class="helpful-link">
						<span class="link-icon">📊</span>
						<span>Activity</span>
					</a>
					<a href="/#contact" class="helpful-link">
						<span class="link-icon">✉️</span>
						<span>Contact</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1.5rem;
		background-color: var(--color-background);
	}

	.error-container {
		max-width: 600px;
		width: 100%;
	}

	.error-content {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.status-code {
		font-size: 8rem;
		font-weight: 900;
		line-height: 1;
		background: linear-gradient(
			135deg,
			var(--color-primary) 0%,
			var(--color-accent) 50%,
			var(--color-primary) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 3s ease infinite;
		background-size: 200% 200%;
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.error-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-foreground);
		margin: 0;
	}

	.error-description {
		font-size: 1.125rem;
		color: var(--color-muted-foreground);
		line-height: 1.6;
		margin: 0;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.helpful-links {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.links-title {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.links-grid {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.helpful-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background-color: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-foreground);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.helpful-link:hover {
		background-color: var(--color-muted);
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.link-icon {
		font-size: 1.25rem;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.status-code {
			animation: none;
		}

		.helpful-link:hover {
			transform: none;
		}
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.error-page {
			padding: 2rem 1rem;
		}

		.status-code {
			font-size: 5rem;
		}

		.error-title {
			font-size: 1.875rem;
		}

		.error-description {
			font-size: 1rem;
		}

		.error-actions {
			flex-direction: column;
			width: 100%;
		}

		.error-actions :global(a) {
			width: 100%;
		}

		.links-grid {
			flex-direction: column;
			gap: 0.75rem;
		}

		.helpful-link {
			width: 100%;
			justify-content: center;
		}
	}
</style>
