<script lang="ts">
	interface Props {
		children?: any;
		class?: string;
		hover?: boolean;
	}

	let { children, class: className = '', hover = false }: Props = $props();
</script>

<div class="card {className}" class:card-hover={hover}>
	{@render children?.()}
</div>

<style>
	.card {
		background-color: var(--color-card);
		color: var(--color-card-foreground);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		transition: all 0.2s ease;
	}

	.card-hover:hover {
		border-color: var(--color-muted-foreground);
		transform: translateY(-2px);
	}
</style>
