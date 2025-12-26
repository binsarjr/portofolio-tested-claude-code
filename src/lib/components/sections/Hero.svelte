<script lang="ts">
	import Button from '../ui/Button.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<section id="home" class="hero {className}">
	<div class="hero-content">
		<div class="hero-text">
			<h1 class="hero-title">
				Binsar Dwi Jasuma
			</h1>
			<p class="hero-tagline">
				KNTL (Keep Never Tired Learning)
			</p>
			<p class="hero-description">
				Software engineer passionate about building elegant solutions and continuously learning new technologies.
				Specializing in web development, data extraction, and open-source contributions.
			</p>
			<div class="hero-actions">
				<Button href="#projects" size="lg">
					View Projects
				</Button>
				<Button href="#contact" variant="secondary" size="lg">
					Contact Me
				</Button>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: calc(100vh - 80px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		position: relative;
	}

	.hero-content {
		max-width: 1280px;
		width: 100%;
		margin: 0 auto;
	}

	.hero-text {
		max-width: 48rem;
		animation: fadeInUp 0.8s ease-out;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1rem;
		background: linear-gradient(
			135deg,
			var(--color-foreground) 0%,
			var(--color-primary) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-tagline {
		font-size: 1.5rem;
		color: var(--color-primary);
		font-weight: 600;
		margin-bottom: 1.5rem;
		letter-spacing: 0.5px;
	}

	.hero-description {
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--color-muted-foreground);
		margin-bottom: 2rem;
		max-width: 42rem;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.hero {
			padding: 4rem 2rem;
		}

		.hero-title {
			font-size: 4.5rem;
		}

		.hero-tagline {
			font-size: 1.875rem;
		}

		.hero-description {
			font-size: 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.hero-title {
			font-size: 5.5rem;
		}
	}
</style>
