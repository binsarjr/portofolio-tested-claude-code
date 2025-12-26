import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

interface GitHubRepository {
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics: string[];
	updated_at: string;
	created_at: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Build headers with optional GitHub token for higher rate limits (5000/hour vs 60/hour)
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github.v3+json'
		};

		if (env.GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
		}

		// Fetch all repositories from GitHub API
		const response = await fetch(
			'https://api.github.com/users/binsarjr/repos?sort=updated&per_page=100',
			{ headers }
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repositories: GitHubRepository[] = await response.json();

		// Filter out forks and sort by stars
		const ownRepositories = repositories
			.filter((repo) => !repo.name.includes('fork'))
			.sort((a, b) => b.stargazers_count - a.stargazers_count);

		return {
			repositories: ownRepositories
		};
	} catch (error) {
		console.error('Failed to fetch GitHub repositories:', error);

		// Return empty array as fallback
		return {
			repositories: []
		};
	}
};
