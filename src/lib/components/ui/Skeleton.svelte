<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SkeletonProps {
		class?: string;
		width?: string;
		height?: string;
		variant?: 'text' | 'circular' | 'rectangular';
		children?: Snippet;
	}

	let { class: className = '', width, height, variant = 'rectangular', children }: SkeletonProps = $props();

	const computedClass = $derived.by(() => {
		const base = 'skeleton';
		const variantClass = variant ? `skeleton-${variant}` : '';
		return [base, variantClass, className].filter(Boolean).join(' ');
	});

	const computedStyle = $derived.by(() => {
		const styles: string[] = [];
		if (width) styles.push(`width: ${width}`);
		if (height) styles.push(`height: ${height}`);
		return styles.join('; ');
	});
</script>

<div class={computedClass} style={computedStyle}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.skeleton {
		background: linear-gradient(
			90deg,
			var(--color-secondary) 0%,
			var(--color-muted) 50%,
			var(--color-secondary) 100%
		);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s ease-in-out infinite;
		border-radius: var(--radius-md);
	}

	.skeleton-text {
		height: 1em;
		border-radius: var(--radius-sm);
		margin-bottom: 0.5rem;
	}

	.skeleton-circular {
		border-radius: 50%;
	}

	.skeleton-rectangular {
		border-radius: var(--radius-md);
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton {
			animation: none;
		}
	}
</style>
