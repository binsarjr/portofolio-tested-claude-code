<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
	import { navigating } from '$app/stores';

	interface Props {
		data: {
			typingStats: {
				wpm: number;
				accuracy: number;
				testsCompleted: number;
				highestWpm: number;
			};
			isRealData: boolean;
		};
	}

	let { data }: Props = $props();

	// Derive loading state
	const isLoading = $derived.by(() => {
		return $navigating !== null;
	});

	const skillCategories = [
		{
			category: 'Languages',
			skills: [
				{ name: 'TypeScript', level: 95, icon: '⚡' },
				{ name: 'JavaScript', level: 95, icon: '⚡' },
				{ name: 'Python', level: 90, icon: '🐍' },
				{ name: 'Go', level: 75, icon: '🔷' },
				{ name: 'PHP', level: 80, icon: '🐘' }
			]
		},
		{
			category: 'Frameworks & Libraries',
			skills: [
				{ name: 'Svelte / SvelteKit', level: 95, icon: '🔥' },
				{ name: 'React', level: 85, icon: '⚛️' },
				{ name: 'Vue.js', level: 80, icon: '💚' },
				{ name: 'Node.js', level: 90, icon: '🟢' },
				{ name: 'Express', level: 85, icon: '🚂' }
			]
		},
		{
			category: 'Tools & Technologies',
			skills: [
				{ name: 'Git', level: 90, icon: '📦' },
				{ name: 'Docker', level: 75, icon: '🐳' },
				{ name: 'PostgreSQL', level: 80, icon: '🐘' },
				{ name: 'MongoDB', level: 75, icon: '🍃' },
				{ name: 'Redis', level: 70, icon: '⚡' }
			]
		},
		{
			category: 'Specializations',
			skills: [
				{ name: 'Web Scraping', level: 95, icon: '🕷️' },
				{ name: 'Data Extraction', level: 90, icon: '📊' },
				{ name: 'API Development', level: 90, icon: '🔌' },
				{ name: 'Performance Optimization', level: 85, icon: '⚡' },
				{ name: 'Open Source', level: 90, icon: '🌟' }
			]
		}
	];

</script>

<svelte:head>
	<title>Skills - Binsar Dwi Jasuma</title>
	<meta
		name="description"
		content="Technical skills and expertise of Binsar Dwi Jasuma - programming languages, frameworks, and tools."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://binsarjr.com/skills" />
	<meta property="og:title" content="Skills - Binsar Dwi Jasuma" />
	<meta property="og:description" content="Technical skills and expertise - TypeScript, Svelte, Python, web scraping, and more. KNTL - Keep Never Tired Learning." />
	<meta property="og:image" content="https://binsarjr.com/og-image.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://binsarjr.com/skills" />
	<meta name="twitter:title" content="Skills - Binsar Dwi Jasuma" />
	<meta name="twitter:description" content="Technical skills and expertise - TypeScript, Svelte, Python, web scraping, and more. KNTL - Keep Never Tired Learning." />
	<meta name="twitter:image" content="https://binsarjr.com/og-image.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://binsarjr.com/skills" />
</svelte:head>

<section class="skills-page">
	<div class="container">
		<div class="header">
			<h1>Skills & Expertise</h1>
			<p class="subtitle">
				Continuously learning and improving. "KNTL - Keep Never Tired Learning"
			</p>
		</div>

		<!-- Typing Stats Card -->
		<Card class="typing-stats-card">
			<div class="typing-header">
				<div class="typing-icon">⌨️</div>
				<div class="typing-title-wrapper">
					<div>
						<h2>Typing Performance</h2>
						<p class="typing-subtitle">
							{#if data.isRealData}
								Real-time stats from Monkeytype
							{:else}
								Measured on Monkeytype
							{/if}
							{#if !data.isRealData}
								<Badge variant="outline" size="sm" class="ml-2 inline-flex">Static</Badge>
							{/if}
						</p>
					</div>
					<a
						href="https://monkeytype.com"
						target="_blank"
						rel="noopener noreferrer"
						class="monkeytype-link"
						aria-label="Visit Monkeytype"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
							<polyline points="15 3 21 3 21 9"></polyline>
							<line x1="10" y1="14" x2="21" y2="3"></line>
						</svg>
					</a>
				</div>
			</div>

			{#if isLoading}
				<div class="stats-grid">
					{#each Array(4) as _, i (i)}
						<div class="stat-item">
							<Skeleton width="80px" height="2.5rem" />
							<Skeleton width="100px" height="0.875rem" />
						</div>
					{/each}
				</div>
			{:else}
				<div class="stats-grid">
					<div class="stat-item">
						<div class="stat-value">{data.typingStats.wpm}</div>
						<div class="stat-label">Average WPM</div>
					</div>
					<div class="stat-item">
						<div class="stat-value">{data.typingStats.accuracy}%</div>
						<div class="stat-label">Accuracy</div>
					</div>
					<div class="stat-item">
						<div class="stat-value">{data.typingStats.highestWpm}</div>
						<div class="stat-label">Highest WPM</div>
					</div>
					<div class="stat-item">
						<div class="stat-value">{data.typingStats.testsCompleted}+</div>
						<div class="stat-label">Tests Completed</div>
					</div>
				</div>
			{/if}
		</Card>

		<!-- Skills Categories -->
		<div class="skills-categories">
			{#each skillCategories as category (category.category)}
				<div class="category-section">
					<h2 class="category-title">{category.category}</h2>

					<div class="skills-list">
						{#each category.skills as skill (skill.name)}
							<Card class="skill-card">
								<div class="skill-header">
									<span class="skill-icon">{skill.icon}</span>
									<span class="skill-name">{skill.name}</span>
								</div>

								<div class="skill-bar-container">
									<div class="skill-bar" style="width: {skill.level}%"></div>
								</div>

								<div class="skill-level">{skill.level}%</div>
							</Card>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="cta-section">
			<h2>Want to work together?</h2>
			<p>I'm always interested in hearing about new projects and opportunities.</p>
			<a href="/#contact" class="cta-button">Get in Touch</a>
		</div>
	</div>
</section>

<style>
	.skills-page {
		min-height: 100vh;
		padding: 6rem 1.5rem 4rem;
		background-color: var(--color-background);
	}

	.container {
		max-width: 1280px;
		margin: 0 auto;
	}

	.header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.header h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		background: linear-gradient(to right, var(--color-foreground), var(--color-muted-foreground));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--color-muted-foreground);
		font-style: italic;
	}

	:global(.typing-stats-card) {
		margin-bottom: 3rem;
		background: linear-gradient(135deg, var(--color-card) 0%, #1a1a2e 100%);
	}

	.typing-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.typing-icon {
		font-size: 3rem;
	}

	.typing-title-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		gap: 1rem;
	}

	.typing-header h2 {
		font-size: 1.875rem;
		margin: 0;
	}

	.typing-subtitle {
		color: var(--color-muted-foreground);
		margin: 0.25rem 0 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.monkeytype-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md);
		background-color: var(--color-muted);
		color: var(--color-muted-foreground);
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.monkeytype-link:hover {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		transform: translateY(-2px);
	}

	:global(.ml-2) {
		margin-left: 0.5rem;
	}

	:global(.inline-flex) {
		display: inline-flex;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--color-primary);
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.skills-categories {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.category-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.category-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--color-foreground);
	}

	.skills-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	:global(.skill-card) {
		padding: 1.25rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	:global(.skill-card:hover) {
		transform: translateY(-2px);
	}

	.skill-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.skill-icon {
		font-size: 1.5rem;
	}

	.skill-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-foreground);
	}

	.skill-bar-container {
		width: 100%;
		height: 8px;
		background-color: var(--color-muted);
		border-radius: 999px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.skill-bar {
		height: 100%;
		background: linear-gradient(to right, var(--color-primary), var(--color-accent));
		border-radius: 999px;
		transition: width 1s ease;
	}

	.skill-level {
		text-align: right;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-muted-foreground);
	}

	.cta-section {
		text-align: center;
		padding: 3rem 2rem;
		background: linear-gradient(135deg, var(--color-card) 0%, #1a1a2e 100%);
		border-radius: var(--radius-xl);
		border: 1px solid var(--color-border);
	}

	.cta-section h2 {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.cta-section p {
		font-size: 1.125rem;
		color: var(--color-muted-foreground);
		margin-bottom: 2rem;
	}

	.cta-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		font-weight: 600;
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-button:hover {
		background-color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
	}

	@media (max-width: 768px) {
		.skills-page {
			padding: 5rem 1rem 3rem;
		}

		.header h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 2rem;
		}

		.skills-list {
			grid-template-columns: 1fr;
		}

		.cta-section {
			padding: 2rem 1.5rem;
		}

		.cta-section h2 {
			font-size: 1.5rem;
		}
	}
</style>
