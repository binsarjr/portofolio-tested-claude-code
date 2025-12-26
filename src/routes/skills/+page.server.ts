import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

interface MonkeytypePersonalBests {
	time: {
		[key: string]: Array<{
			wpm: number;
			acc: number;
			timestamp: number;
		}>;
	};
}

interface MonkeytypeProfile {
	name: string;
	addedAt: number;
	typingStats: {
		timeTyping: number;
		startedTests: number;
		completedTests: number;
	};
}

export const load: PageServerLoad = async ({ fetch }) => {
	// Return early if no API key is configured
	if (!env.MONKEYTYPE_APE_KEY) {
		console.log('ℹ️  Monkeytype API key not configured, using fallback data');
		return {
			typingStats: null // Will use static fallback in component
		};
	}

	try {
		const headers = {
			Accept: 'application/json',
			Authorization: `ApeKey ${env.MONKEYTYPE_APE_KEY}`
		};

		// Fetch personal bests
		const pbResponse = await fetch('https://api.monkeytype.com/users/personalBests', {
			headers
		});

		// Fetch profile for additional stats
		const profileResponse = await fetch('https://api.monkeytype.com/users/profile', {
			headers
		});

		if (!pbResponse.ok || !profileResponse.ok) {
			throw new Error(
				`Monkeytype API error: ${pbResponse.status} / ${profileResponse.status}`
			);
		}

		const pbData = (await pbResponse.json()) as { data: MonkeytypePersonalBests };
		const profileData = (await profileResponse.json()) as { data: MonkeytypeProfile };

		// Extract statistics
		const personalBests = pbData.data;
		const profile = profileData.data;

		// Get best WPM from time-based tests (60 seconds is most common)
		const time60Tests = personalBests.time['60'] || [];
		const highestWpm = time60Tests.length > 0 ? Math.max(...time60Tests.map((t) => t.wpm)) : 0;

		// Calculate average WPM and accuracy from recent tests
		const recentTests = time60Tests.slice(0, 10);
		const avgWpm =
			recentTests.length > 0
				? Math.round(recentTests.reduce((sum, t) => sum + t.wpm, 0) / recentTests.length)
				: 0;
		const avgAccuracy =
			recentTests.length > 0
				? Math.round(recentTests.reduce((sum, t) => sum + t.acc, 0) / recentTests.length)
				: 0;

		return {
			typingStats: {
				wpm: avgWpm,
				accuracy: avgAccuracy,
				testsCompleted: profile.typingStats.completedTests,
				highestWpm: Math.round(highestWpm)
			}
		};
	} catch (error) {
		console.error('Failed to fetch Monkeytype data:', error);

		// Return null to use fallback data in component
		return {
			typingStats: null
		};
	}
};
