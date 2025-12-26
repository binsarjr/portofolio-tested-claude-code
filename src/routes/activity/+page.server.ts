import type { PageServerLoad } from './$types';

interface GitHubUser {
	name: string;
	bio: string;
	avatar_url: string;
	followers: number;
	following: number;
	public_repos: number;
	public_gists: number;
	created_at: string;
}

interface GitHubRepository {
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	updated_at: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Fetch user data
		const userResponse = await fetch('https://api.github.com/users/binsarjr', {
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		});

		if (!userResponse.ok) {
			throw new Error(`GitHub API error: ${userResponse.status}`);
		}

		const user: GitHubUser = await userResponse.json();

		// Fetch repositories
		const reposResponse = await fetch(
			'https://api.github.com/users/binsarjr/repos?sort=updated&per_page=50',
			{
				headers: {
					Accept: 'application/vnd.github.v3+json'
				}
			}
		);

		if (!reposResponse.ok) {
			throw new Error(`GitHub API error: ${reposResponse.status}`);
		}

		const repos: GitHubRepository[] = await reposResponse.json();

		// Calculate total stars across all repos
		const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

		// Get recent repositories (non-forked)
		const recentRepos = repos.filter((repo) => !repo.name.includes('fork')).slice(0, 10);

		return {
			user,
			totalStars,
			recentRepos
		};
	} catch (error) {
		console.error('Failed to fetch GitHub data:', error);

		// Return fallback data
		return {
			user: {
				name: 'Binsar Dwi Jasuma',
				bio: '',
				avatar_url: '',
				followers: 144,
				following: 0,
				public_repos: 259,
				public_gists: 0,
				created_at: ''
			},
			totalStars: 100,
			recentRepos: []
		};
	}
};
