<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			href: 'https://github.com/binsarjr',
			icon: 'github'
		},
		{
			name: 'LinkedIn',
			href: 'https://linkedin.com/in/binsar-dwi-jasuma',
			icon: 'linkedin'
		},
		{
			name: 'Email',
			href: 'mailto:binsarjr@gmail.com',
			icon: 'mail'
		}
	];

	function getIcon(iconName: string) {
		const icons: Record<string, string> = {
			github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
			linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
			mail: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z'
		};
		return icons[iconName] || '';
	}
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-content">
			<!-- Branding/Bio -->
			<div class="footer-section">
				<h3 class="footer-title">Binsar Dwi Jasuma</h3>
				<p class="footer-tagline">KNTL (Keep Never Tired Learning)</p>
				<p class="footer-description">
					Full-stack developer specializing in TypeScript, Python, and the Svelte ecosystem.
				</p>
			</div>

			<!-- Social Links -->
			<div class="footer-section">
				<h4 class="footer-subtitle">Connect</h4>
				<div class="social-links">
					{#each socialLinks as social (social.name)}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label={social.name}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d={getIcon(social.icon)} />
							</svg>
							<span>{social.name}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="footer-bottom">
			<p class="copyright">© {currentYear} Binsar Dwi Jasuma. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		width: 100%;
		background-color: var(--color-card);
		border-top: 1px solid var(--color-border);
		margin-top: auto;
	}

	.footer-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 3rem 1.5rem 1.5rem;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-foreground);
		margin: 0;
	}

	.footer-tagline {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		margin: 0;
	}

	.footer-description {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		line-height: 1.6;
		margin: 0;
	}

	.footer-subtitle {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-foreground);
		margin: 0;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-muted-foreground);
		text-decoration: none;
		transition: color 0.2s ease;
		font-size: 0.875rem;
	}

	.social-link:hover {
		color: var(--color-primary);
	}

	.footer-bottom {
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.copyright {
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		margin: 0;
	}

	/* Desktop styles */
	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 2fr 1fr;
		}

		.social-links {
			flex-direction: row;
			gap: 1.5rem;
		}
	}
</style>
