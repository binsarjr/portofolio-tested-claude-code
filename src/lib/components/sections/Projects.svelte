<script lang="ts">
	import Card from '../ui/Card.svelte';
	import Badge from '../ui/Badge.svelte';
	import Button from '../ui/Button.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	interface Project {
		name: string;
		description: string;
		stars: number;
		url: string;
		techStack: string[];
		highlights?: string;
	}

	const projects: Project[] = [
		{
			name: 'chatbot-indonesia',
			description: 'A comprehensive Indonesian language chatbot framework with natural language processing capabilities. Built to handle complex conversational flows and context management.',
			stars: 37,
			url: 'https://github.com/binsarjr/chatbot-indonesia',
			techStack: ['TypeScript', 'Node.js', 'NLP'],
			highlights: 'Most starred project'
		},
		{
			name: 'node-email-extractor',
			description: 'Powerful email extraction tool for Node.js with support for multiple sources and formats. Features advanced pattern matching and validation.',
			stars: 18,
			url: 'https://github.com/binsarjr/node-email-extractor',
			techStack: ['JavaScript', 'Node.js', 'Regex']
		},
		{
			name: 'design-tools',
			description: 'Collection of design utilities and tools for developers. Includes color palette generators, typography helpers, and layout calculators.',
			stars: 12,
			url: 'https://github.com/binsarjr/design-tools',
			techStack: ['TypeScript', 'React', 'CSS']
		},
		{
			name: 'svelte-lazyimage-cache',
			description: 'Svelte component for lazy loading images with built-in caching mechanism. Optimizes performance and reduces bandwidth usage.',
			stars: 11,
			url: 'https://github.com/binsarjr/svelte-lazyimage-cache',
			techStack: ['Svelte', 'TypeScript', 'Web APIs']
		}
	];
</script>

<section id="projects" class="projects {className}">
	<div class="projects-content">
		<h2 class="section-title">Featured Projects</h2>
		<p class="section-subtitle">
			A selection of open-source projects showcasing my expertise in web development,
			data processing, and developer tools.
		</p>

		<div class="projects-grid">
			{#each projects as project (project.name)}
				<Card class="project-card" hover>
					<div class="project-header">
						<h3 class="project-name">{project.name}</h3>
						<div class="project-stars">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-label="stars"
							>
								<path
									d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
								/>
							</svg>
							<span>{project.stars}</span>
						</div>
					</div>

					{#if project.highlights}
						<div class="project-highlight">
							<Badge variant="secondary">{project.highlights}</Badge>
						</div>
					{/if}

					<p class="project-description">{project.description}</p>

					<div class="project-tech">
						{#each project.techStack as tech (tech)}
							<Badge variant="outline" class="tech-badge">{tech}</Badge>
						{/each}
					</div>

					<div class="project-action">
						<Button href={project.url} variant="ghost" size="sm" class="view-button">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
								style="margin-right: 0.5rem;"
							>
								<path
									d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
								/>
							</svg>
							View on GitHub
						</Button>
					</div>
				</Card>
			{/each}
		</div>

		<div class="projects-footer">
			<p class="more-projects">
				Explore all <strong>259 repositories</strong> on my GitHub profile
			</p>
			<Button href="https://github.com/binsarjr" variant="secondary" size="lg">
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="currentColor"
					style="margin-right: 0.5rem;"
				>
					<path
						d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
					/>
				</svg>
				View All Projects
			</Button>
		</div>
	</div>
</section>

<style>
	.projects {
		padding: 6rem 1rem;
		background: linear-gradient(
			180deg,
			var(--color-background) 0%,
			rgba(9, 9, 11, 0.5) 100%
		);
	}

	.projects-content {
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

	.projects-grid {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.projects-grid :global(.project-card) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 1rem;
	}

	.project-name {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-foreground);
		font-family: 'Courier New', monospace;
	}

	.project-stars {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.project-stars svg {
		color: var(--color-primary);
	}

	.project-highlight {
		margin-top: -0.5rem;
	}

	.project-description {
		color: var(--color-muted-foreground);
		line-height: 1.6;
		flex-grow: 1;
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.project-action {
		margin-top: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.projects-grid :global(.view-button) {
		width: 100%;
		justify-content: center;
	}

	.projects-footer {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.more-projects {
		font-size: 1.125rem;
		color: var(--color-muted-foreground);
		margin-bottom: 1.5rem;
	}

	.more-projects strong {
		color: var(--color-primary);
		font-weight: 600;
	}

	@media (min-width: 640px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.projects {
			padding: 8rem 2rem;
		}

		.section-title {
			font-size: 3rem;
		}

		.section-subtitle {
			font-size: 1.25rem;
			margin-bottom: 4rem;
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}
</style>
