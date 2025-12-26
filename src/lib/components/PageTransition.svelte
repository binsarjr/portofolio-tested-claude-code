<script lang="ts">
	import type { Snippet } from 'svelte';
	import { navigating } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	interface PageTransitionProps {
		children: Snippet;
	}

	let { children }: PageTransitionProps = $props();

	// Track navigation state
	const isNavigating = $derived($navigating !== null);
</script>

{#key $navigating?.to?.url.pathname}
	<div
		in:fly={{ y: 20, duration: 300, delay: 150 }}
		out:fade={{ duration: 150 }}
		class="page-transition-wrapper"
	>
		{@render children()}
	</div>
{/key}

<style>
	.page-transition-wrapper {
		width: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition-wrapper {
			animation: none;
		}
	}
</style>
