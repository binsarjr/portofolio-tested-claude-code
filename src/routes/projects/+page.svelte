<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { getLanguageColor } from '$lib/utils/languageColors';
	import ProjectCardSkeleton from '$lib/components/skeletons/ProjectCardSkeleton.svelte';
	import { navigating } from '$app/stores';

	let { data }: { data: PageData } = $props();

	// Show loading state during navigation or if no data yet
	const isLoading = $derived($navigating !== null || data.repositories.length === 0);
	const showError = $derived(!isLoading && data.repositories.length === 0);
</script>

<svelte:head>
	<title>Projects - Binsar Dwi Jasuma</title>
	<meta
		name="description"
		content="Explore all projects by Binsar Dwi Jasuma - open source contributions, libraries, and tools."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://binsarjr.com/projects" />
	<meta property="og:title" content="Projects - Binsar Dwi Jasuma" />
	<meta property="og:description" content="Explore all projects by Binsar Dwi Jasuma - open source contributions, libraries, and tools." />
	<meta property="og:image" content="https://binsarjr.com/og-image.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://binsarjr.com/projects" />
	<meta name="twitter:title" content="Projects - Binsar Dwi Jasuma" />
	<meta name="twitter:description" content="Explore all projects by Binsar Dwi Jasuma - open source contributions, libraries, and tools." />
	<meta name="twitter:image" content="https://binsarjr.com/og-image.png" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://binsarjr.com/projects" />
</svelte:head>

<section class="projects-page">
	<div class="container">
		<div class="header">
			<h1>All Projects</h1>
			<p class="subtitle">
				{#if isLoading}
					Loading repositories...
				{:else if showError}
					Unable to load repositories. Please try again later.
				{:else}
					Open source projects, libraries, and tools I've built. {data.repositories.length} repositories
					and counting.
				{/if}
			</p>
		</div>

		<div class="projects-grid">
			{#if isLoading}
				<!-- Show 6 skeleton cards while loading -->
				{#each Array(6) as _, i (i)}
					<ProjectCardSkeleton />
				{/each}
			{:else if showError}
				<div class="error-message">
					<Card>
						<div class="error-content">
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							<h3>Failed to Load Repositories</h3>
							<p>We couldn't fetch the repository data from GitHub. This might be due to rate limiting or network issues.</p>
							<button onclick={() => window.location.reload()} class="retry-button">
								Try Again
							</button>
						</div>
					</Card>
				</div>
			{:else}
				{#each data.repositories as project (project.name)}
					<Card>
						<h3 class="project-title">{project.name}</h3>
						<p class="project-description">{project.description || 'No description available'}</p>

						<div class="project-stats">
							<span class="stat">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
									<path
										d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
									></path>
								</svg>
								{project.stargazers_count}
							</span>
							<span class="stat">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
									<path
										d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
									></path>
								</svg>
								{project.forks_count}
							</span>
						</div>

						{#if project.topics && project.topics.length > 0}
							<div class="project-topics">
								{#each project.topics.slice(0, 5) as topic (topic)}
									<Badge variant="secondary" size="sm">{topic}</Badge>
								{/each}
							</div>
						{/if}

						<div class="project-footer">
							{#if project.language}
								<span class="language">
									<span class="language-dot" style="background-color: {getLanguageColor(project.language)}"></span>
									{project.language}
								</span>
							{/if}
							<a
								href={project.html_url}
								target="_blank"
								rel="noopener noreferrer"
								class="view-link"
								data-sveltekit-reload
							>
								View on GitHub →
							</a>
						</div>
					</Card>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	.projects-page {
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
		max-width: 600px;
		margin: 0 auto;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.project-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: var(--color-foreground);
	}

	.project-description {
		color: var(--color-muted-foreground);
		line-height: 1.6;
		margin-bottom: 1rem;
		min-height: 3rem;
	}

	.project-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
	}

	.stat {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.stat svg {
		color: var(--color-muted-foreground);
	}

	.project-topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.project-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.language {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
	}

	.language-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.view-link {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.view-link:hover {
		color: var(--color-accent);
	}

	.error-message {
		grid-column: 1 / -1;
		text-align: center;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 3rem 2rem;
	}

	.error-content svg {
		color: var(--color-muted-foreground);
	}

	.error-content h3 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
		color: var(--color-foreground);
	}

	.error-content p {
		color: var(--color-muted-foreground);
		max-width: 500px;
		margin: 0;
	}

	.retry-button {
		padding: 0.75rem 2rem;
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		border: none;
		border-radius: var(--radius-lg);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.retry-button:hover {
		background-color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
	}

	@media (max-width: 768px) {
		.projects-page {
			padding: 5rem 1rem 3rem;
		}

		.header h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.error-content {
			padding: 2rem 1rem;
		}
	}
</style>
