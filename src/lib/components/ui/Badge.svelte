<script lang="ts">
	interface Props {
		children?: any;
		class?: string;
		variant?: 'default' | 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md';
	}

	let { children, class: className = '', variant = 'default', size = 'md' }: Props = $props();
</script>

<span
	class="badge {className}"
	class:badge-default={variant === 'default'}
	class:badge-primary={variant === 'primary'}
	class:badge-secondary={variant === 'secondary'}
	class:badge-outline={variant === 'outline'}
	class:badge-sm={size === 'sm'}
	class:badge-md={size === 'md'}
>
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: var(--radius-xl);
		white-space: nowrap;
		transition: background-color 0.2s ease;
	}

	.badge-default {
		background-color: var(--color-muted);
		color: var(--color-muted-foreground);
	}

	.badge-primary {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.badge-secondary {
		background-color: var(--color-secondary);
		color: var(--color-secondary-foreground);
		border: 1px solid var(--color-border);
	}

	.badge-outline {
		background-color: transparent;
		color: var(--color-muted-foreground);
		border: 1px solid var(--color-border);
	}

	.badge-sm {
		padding: 0.125rem 0.5rem;
		font-size: 0.625rem;
	}

	.badge-md {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
	}
</style>
