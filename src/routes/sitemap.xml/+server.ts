import type { RequestHandler } from './$types';

// Define the base URL - update this to your actual domain
const BASE_URL = 'https://binsarjr.com';

// Define all static routes in the application
const staticRoutes = ['/', '/projects', '/skills', '/activity'];

/**
 * Generate XML sitemap with all routes
 * @see https://www.sitemaps.org/protocol.html
 */
export const GET: RequestHandler = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
	.map(
		(route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
		}
	});
};
