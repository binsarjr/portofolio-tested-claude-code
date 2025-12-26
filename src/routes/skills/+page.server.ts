import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

interface MonkeytypeStats {
	completedTests: number;
	startedTests: number;
	timeTyping: number; // in seconds
}

interface PersonalBest {
	wpm: number;
	acc: number;
	consistency: number;
	raw: number;
	timestamp: number;
}

interface MonkeytypePersonalBests {
	time: {
		[key: string]: PersonalBest[];
	};
}

interface TypingStats {
	wpm: number;
	accuracy: number;
	testsCompleted: number;
	highestWpm: number;
}

export const load: PageServerLoad = async ({ fetch }) => {
	// Default fallback stats
	const fallbackStats: TypingStats = {
		wpm: 95,
		accuracy: 97,
		testsCompleted: 500,
		highestWpm: 120
	};

	// Get API key from environment
	const apiKey = env.MONKEYTYPE_API_KEY;

	// If no API key is configured, return fallback data
	if (!apiKey || apiKey === 'your_monkeytype_ape_key_here') {
		console.log('Monkeytype API key not configured, using fallback data');
		return {
			typingStats: fallbackStats,
			isRealData: false
		};
	}

	try {
		// Fetch user stats
		const statsResponse = await fetch('https://api.monkeytype.com/users/stats', {
			headers: {
				Authorization: `ApeKey ${apiKey}`,
				Accept: 'application/json'
			}
		});

		if (!statsResponse.ok) {
			throw new Error(`Monkeytype API error: ${statsResponse.status}`);
		}

		const statsData = await statsResponse.json();
		const stats: MonkeytypeStats = statsData.data;

		// Fetch personal bests (time mode, 60 seconds)
		const pbResponse = await fetch('https://api.monkeytype.com/users/personalBests?mode=time', {
			headers: {
				Authorization: `ApeKey ${apiKey}`,
				Accept: 'application/json'
			}
		});

		if (!pbResponse.ok) {
			throw new Error(`Monkeytype API error: ${pbResponse.status}`);
		}

		const pbData = await pbResponse.json();
		const personalBests: MonkeytypePersonalBests = pbData.data;

		// Calculate average WPM and accuracy from 60-second tests
		let avgWpm = fallbackStats.wpm;
		let avgAccuracy = fallbackStats.accuracy;
		let highestWpm = fallbackStats.highestWpm;

		if (personalBests.time && personalBests.time['60']) {
			const tests60s = personalBests.time['60'];
			if (tests60s.length > 0) {
				// Calculate average from recent tests (up to 10 most recent)
				const recentTests = tests60s.slice(-10);
				const sumWpm = recentTests.reduce((sum, test) => sum + test.wpm, 0);
				const sumAcc = recentTests.reduce((sum, test) => sum + test.acc, 0);
				avgWpm = Math.round(sumWpm / recentTests.length);
				avgAccuracy = Math.round(sumAcc / recentTests.length);

				// Find highest WPM
				highestWpm = Math.round(Math.max(...tests60s.map((test) => test.wpm)));
			}
		}

		return {
			typingStats: {
				wpm: avgWpm,
				accuracy: avgAccuracy,
				testsCompleted: stats.completedTests,
				highestWpm: highestWpm
			},
			isRealData: true
		};
	} catch (error) {
		console.error('Failed to fetch Monkeytype data:', error);

		// Return fallback data on error
		return {
			typingStats: fallbackStats,
			isRealData: false
		};
	}
};
