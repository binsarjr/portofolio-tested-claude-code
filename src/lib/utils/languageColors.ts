/**
 * GitHub language colors
 * Based on https://github.com/ozh/github-colors
 */

const languageColors: Record<string, string> = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	Python: '#3572A5',
	Go: '#00ADD8',
	Rust: '#dea584',
	Java: '#b07219',
	Svelte: '#ff3e00',
	Vue: '#41b883',
	React: '#61dafb',
	HTML: '#e34c26',
	CSS: '#563d7c',
	SCSS: '#c6538c',
	Shell: '#89e051',
	PHP: '#4F5D95',
	Ruby: '#701516',
	'C++': '#f34b7d',
	C: '#555555',
	'C#': '#178600',
	Dart: '#00B4AB',
	Swift: '#F05138',
	Kotlin: '#A97BFF',
	Lua: '#000080',
	R: '#198CE7',
	Dockerfile: '#384d54',
	MDX: '#fcb32c',
	Markdown: '#083fa1'
};

export function getLanguageColor(language: string): string {
	return languageColors[language] || '#8b949e'; // Default gray color
}
