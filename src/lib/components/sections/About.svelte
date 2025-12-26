<script lang="ts">
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/Card.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const skills = [
		{ name: 'TypeScript', category: 'language' },
		{ name: 'JavaScript', category: 'language' },
		{ name: 'Python', category: 'language' },
		{ name: 'Svelte', category: 'framework' },
		{ name: 'SvelteKit', category: 'framework' },
		{ name: 'React', category: 'framework' },
		{ name: 'Node.js', category: 'runtime' },
		{ name: 'Bun', category: 'runtime' },
		{ name: 'Web Scraping', category: 'specialty' },
		{ name: 'Data Extraction', category: 'specialty' },
		{ name: 'API Development', category: 'specialty' },
		{ name: 'Open Source', category: 'specialty' }
	];

	const stats = [
		{ label: 'Repositories', value: '259' },
		{ label: 'Followers', value: '144' },
		{ label: 'Total Stars', value: '100+' },
		{ label: 'Years Coding', value: '5+' }
	];
</script>

<section id="about" class="about {className}">
	<div class="about-content">
		<h2 class="section-title">About Me</h2>

		<div class="about-grid">
			<div class="about-text">
				<p class="bio">
					I'm a passionate software engineer with a strong focus on building elegant, efficient solutions
					to complex problems. My journey in tech is guided by my personal motto: <strong>KNTL (Keep Never Tired Learning)</strong>
					— a constant reminder to stay curious and keep evolving.
				</p>

				<p class="bio">
					With expertise spanning web development, data extraction, and automation, I've built and contributed
					to numerous open-source projects. I specialize in creating robust applications using modern JavaScript
					frameworks and have a particular interest in web scraping, data processing, and developer tools.
				</p>

				<p class="bio">
					My work reflects a commitment to clean code, thoughtful architecture, and continuous improvement.
					When I'm not coding, I'm exploring new technologies, contributing to the open-source community,
					or sharing knowledge with fellow developers.
				</p>
			</div>

			<div class="stats-grid">
				{#each stats as stat (stat.label)}
					<Card class="stat-card">
						<div class="stat-value">{stat.value}</div>
						<div class="stat-label">{stat.label}</div>
					</Card>
				{/each}
			</div>
		</div>

		<div class="skills-section">
			<h3 class="skills-title">Skills & Technologies</h3>
			<div class="skills-grid">
				{#each skills as skill (skill.name)}
					<Badge variant={skill.category === 'language' ? 'default' : skill.category === 'framework' ? 'secondary' : 'outline'}>
						{skill.name}
					</Badge>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: 6rem 1rem;
		background: var(--color-background);
	}

	.about-content {
		max-width: 1280px;
		margin: 0 auto;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 3rem;
		text-align: center;
		color: var(--color-foreground);
	}

	.about-grid {
		display: grid;
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.bio {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-muted-foreground);
	}

	.bio strong {
		color: var(--color-primary);
		font-weight: 600;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.stats-grid :global(.stat-card) {
		text-align: center;
		padding: 1.5rem 1rem;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.skills-section {
		margin-top: 4rem;
	}

	.skills-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		color: var(--color-foreground);
	}

	.skills-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	@media (min-width: 768px) {
		.about {
			padding: 8rem 2rem;
		}

		.section-title {
			font-size: 3rem;
		}

		.about-grid {
			grid-template-columns: 2fr 1fr;
			gap: 4rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.bio {
			font-size: 1.25rem;
		}

		.skills-title {
			font-size: 1.875rem;
		}
	}

	@media (min-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
