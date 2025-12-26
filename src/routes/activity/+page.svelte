<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import StatCardSkeleton from '$lib/components/skeletons/StatCardSkeleton.svelte';
	import ActivityCardSkeleton from '$lib/components/skeletons/ActivityCardSkeleton.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
	import { navigating } from '$app/stores';

	let { data }: { data: PageData } = $props();

	// Show loading state during navigation
	const isLoading = $derived($navigating !== null);
	const hasData = $derived(data.user && data.recentRepos.length > 0);
</script>

<svelte:head>
	<title>Activity - Binsar Dwi Jasuma</title>
	<meta
		name="description"
		content="GitHub activity and contributions by Binsar Dwi Jasuma - real-time open source work."
	/>
</svelte:head>

<section class="activity-page">
	<div class="container">
		<div class="header">
			<h1>GitHub Activity</h1>
			<p class="subtitle">Real-time contributions and open source work</p>
		</div>

		<!-- User Stats -->
		<div class="stats-overview">
			{#if isLoading}
				{#each Array(4) as _, i (i)}
					<StatCardSkeleton />
				{/each}
			{:else}
				<Card class="stat-card">
					<div class="stat-icon">📦</div>
					<div class="stat-content">
						<div class="stat-value">{data.user.public_repos}</div>
						<div class="stat-label">Public Repositories</div>
					</div>
				</Card>

				<Card class="stat-card">
					<div class="stat-icon">👥</div>
					<div class="stat-content">
						<div class="stat-value">{data.user.followers}</div>
						<div class="stat-label">Followers</div>
					</div>
				</Card>

				<Card class="stat-card">
					<div class="stat-icon">👤</div>
					<div class="stat-content">
						<div class="stat-value">{data.user.following}</div>
						<div class="stat-label">Following</div>
					</div>
				</Card>

				<Card class="stat-card">
					<div class="stat-icon">⭐</div>
					<div class="stat-content">
						<div class="stat-value">{data.totalStars}</div>
						<div class="stat-label">Total Stars</div>
					</div>
				</Card>
			{/if}
		</div>

		<!-- Contribution Graph Embed -->
		<Card class="contribution-card">
			<h2 class="section-title">Contribution Activity</h2>
			{#if isLoading}
				<div class="contribution-embed">
					<Skeleton height="150px" width="100%" />
				</div>
				<div class="chart-note">
					<Skeleton height="0.875rem" width="300px" class="chart-note-skeleton" />
				</div>
			{:else}
				<div class="contribution-embed">
					<img
						src="https://ghchart.rshah.org/3b82f6/binsarjr"
						alt="GitHub Contribution Chart"
						class="contribution-chart"
						loading="lazy"
					/>
				</div>
				<p class="chart-note">
					Last 12 months of contributions • Data from
					<a
						href="https://github.com/binsarjr"
						target="_blank"
						rel="noopener noreferrer"
						data-sveltekit-reload
					>
						@binsarjr
					</a>
				</p>
			{/if}
		</Card>

		<!-- Recent Activity -->
		<div class="recent-activity">
			<h2 class="section-title">Recent Repositories</h2>
			<div class="activity-grid">
				{#if isLoading}
					{#each Array(6) as _, i (i)}
						<ActivityCardSkeleton />
					{/each}
				{:else}
					{#each data.recentRepos.slice(0, 6) as repo (repo.name)}
						<Card class="activity-item">
							<div class="activity-header">
								<h3 class="activity-title">{repo.name}</h3>
								<Badge variant="secondary" size="sm">
									Updated {new Date(repo.updated_at).toLocaleDateString()}
								</Badge>
							</div>

							<p class="activity-description">{repo.description || 'No description'}</p>

							<div class="activity-stats">
								<span class="activity-stat">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
										<path
											d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
										></path>
									</svg>
									{repo.stargazers_count}
								</span>
								<span class="activity-stat">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
										<path
											d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
										></path>
									</svg>
									{repo.forks_count}
								</span>
								{#if repo.language}
									<Badge variant="outline" size="sm">{repo.language}</Badge>
								{/if}
							</div>

							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								class="activity-link"
								data-sveltekit-reload
							>
								View Repository →
							</a>
						</Card>
					{/each}
				{/if}
			</div>
		</div>

		<!-- View All Link -->
		<div class="view-all-section">
			<a href="/projects" class="view-all-button"> View All Projects </a>
			<a
				href="https://github.com/binsarjr"
				target="_blank"
				rel="noopener noreferrer"
				class="github-button"
				data-sveltekit-reload
			>
				<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
					></path>
				</svg>
				Visit GitHub Profile
			</a>
		</div>
	</div>
</section>

<style>
	.activity-page {
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
	}

	.stats-overview {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	:global(.stat-card) {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.5rem;
	}

	.stat-icon {
		font-size: 2.5rem;
	}

	.stat-content {
		flex: 1;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 800;
		color: var(--color-primary);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		margin-top: 0.25rem;
	}

	:global(.contribution-card) {
		margin-bottom: 3rem;
		padding: 2rem;
	}

	.section-title {
		font-size: 1.875rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.contribution-embed {
		width: 100%;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	.contribution-chart {
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
	}

	.chart-note {
		font-size: 0.875rem;
		color: var(--color-muted-foreground);
		text-align: center;
		margin: 0;
	}

	.chart-note a {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 600;
	}

	:global(.chart-note-skeleton) {
		margin: 0 auto;
	}

	.recent-activity {
		margin-bottom: 3rem;
	}

	.activity-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	:global(.activity-item) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.activity-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.activity-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		color: var(--color-foreground);
	}

	.activity-description {
		color: var(--color-muted-foreground);
		line-height: 1.6;
		margin: 0;
		flex-grow: 1;
	}

	.activity-stats {
		display: flex;
		gap: 1rem;
		align-items: center;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
	}

	.activity-stat {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.activity-link {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		text-decoration: none;
		margin-top: auto;
		transition: color 0.2s ease;
	}

	.activity-link:hover {
		color: var(--color-accent);
	}

	.view-all-section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.view-all-button,
	.github-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 2rem;
		font-weight: 600;
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.view-all-button {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.view-all-button:hover {
		background-color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
	}

	.github-button {
		background-color: var(--color-secondary);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
	}

	.github-button:hover {
		background-color: var(--color-muted);
		border-color: var(--color-muted-foreground);
	}

	@media (max-width: 768px) {
		.activity-page {
			padding: 5rem 1rem 3rem;
		}

		.header h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.stats-overview {
			grid-template-columns: repeat(2, 1fr);
		}

		.activity-grid {
			grid-template-columns: 1fr;
		}

		.contribution-embed {
			overflow-x: scroll;
		}
	}
</style>
