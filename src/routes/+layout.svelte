<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<a href="#main-content" class="skip-to-content">
	Skip to main content
</a>

<div class="app-layout">
	<Navigation />
	<main id="main-content" class="main-content">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.skip-to-content {
		position: absolute;
		left: -9999px;
		z-index: 999;
		padding: 1rem 1.5rem;
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
		text-decoration: none;
		border-radius: 0.5rem;
		font-weight: 600;
		top: 1rem;
	}

	.skip-to-content:focus {
		left: 1rem;
	}

	.app-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex: 1;
	}
</style>
