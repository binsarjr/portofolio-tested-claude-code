<script lang="ts">
	/**
	 * StructuredData component for adding JSON-LD structured data to pages
	 * Improves SEO by helping search engines understand page content
	 */

	interface Props {
		data: object | object[];
	}

	let { data }: Props = $props();

	// Convert data to JSON-LD format
	const jsonLd = $derived.by(() => {
		const items = Array.isArray(data) ? data : [data];
		return items.map(item => ({
			'@context': 'https://schema.org',
			...item
		}));
	});

	// Stringify for embedding in script tag
	const jsonLdString = $derived(
		JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd, null, 0)
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLdString}<\/script>`}
</svelte:head>
