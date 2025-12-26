<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
</script>

<div class="container">
	<!-- Hero Section -->
	<section class="hero">
		<h1 class="hero-title">Design System Foundation</h1>
		<p class="hero-description">
			Shadcn-inspired dark theme for Binsar Dwi Jasuma's portfolio
		</p>
		<div class="hero-actions">
			<Button variant="primary" size="lg">Get Started</Button>
			<Button variant="secondary" size="lg">Learn More</Button>
		</div>
	</section>

	<!-- Components Showcase -->
	<section class="section">
		<h2>UI Components</h2>

		<div class="showcase-group">
			<h3>Buttons</h3>
			<div class="button-group">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Destructive</Button>
			</div>
		</div>

		<div class="showcase-group">
			<h3>Badges</h3>
			<div class="badge-group">
				<Badge>TypeScript</Badge>
				<Badge>JavaScript</Badge>
				<Badge>Svelte</Badge>
				<Badge>Python</Badge>
				<Badge variant="primary">Featured</Badge>
			</div>
		</div>

		<div class="showcase-group">
			<h3>Cards</h3>
			<div class="card-grid">
				<Card hover={true}>
					<h4>Project Card</h4>
					<p>This is a card component with hover effect enabled.</p>
					<div class="badge-group">
						<Badge>React</Badge>
						<Badge>TypeScript</Badge>
					</div>
				</Card>
				<Card>
					<h4>Static Card</h4>
					<p>This card has no hover effect.</p>
					<div class="badge-group">
						<Badge>Svelte</Badge>
						<Badge>Vite</Badge>
					</div>
				</Card>
			</div>
		</div>

		<div class="showcase-group">
			<h3>Form Components</h3>
			<Card>
				<form class="form">
					<div class="form-field">
						<label for="name">Name</label>
						<Input id="name" type="text" placeholder="Your name" bind:value={name} />
					</div>
					<div class="form-field">
						<label for="email">Email</label>
						<Input id="email" type="email" placeholder="your@email.com" bind:value={email} />
					</div>
					<div class="form-field">
						<label for="message">Message</label>
						<Textarea
							id="message"
							placeholder="Tell me about your project..."
							bind:value={message}
						/>
					</div>
					<Button variant="primary" type="submit">Send Message</Button>
				</form>
			</Card>
		</div>
	</section>

	<!-- Typography Showcase -->
	<section class="section">
		<h2>Typography</h2>
		<div class="typography-showcase">
			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>
			<p>
				This is a paragraph with <a href="#">a link</a>. The typography uses Inter font family
				with proper line height and letter spacing for optimal readability.
			</p>
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	.hero {
		text-align: center;
		padding: 4rem 0 6rem;
	}

	.hero-title {
		margin-bottom: 1rem;
	}

	.hero-description {
		font-size: 1.25rem;
		color: var(--color-muted-foreground);
		margin-bottom: 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.section {
		margin-bottom: 4rem;
	}

	.showcase-group {
		margin-bottom: 3rem;
	}

	.showcase-group h3 {
		margin-bottom: 1rem;
		color: var(--color-muted-foreground);
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.badge-group {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.card-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-field label {
		font-weight: 500;
		font-size: 0.875rem;
	}

	.typography-showcase {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Responsive */
	@media (min-width: 768px) {
		.card-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
