<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
		children?: any;
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		onclick,
		children,
		class: className = ''
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class="btn {className}"
	class:btn-primary={variant === 'primary'}
	class:btn-secondary={variant === 'secondary'}
	class:btn-ghost={variant === 'ghost'}
	class:btn-destructive={variant === 'destructive'}
	class:btn-sm={size === 'sm'}
	class:btn-md={size === 'md'}
	class:btn-lg={size === 'lg'}
>
	{@render children?.()}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
		cursor: pointer;
		border: 1px solid transparent;
		white-space: nowrap;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Variants */
	.btn-primary {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--color-accent);
	}

	.btn-secondary {
		background-color: var(--color-secondary);
		color: var(--color-secondary-foreground);
		border-color: var(--color-border);
	}

	.btn-secondary:hover:not(:disabled) {
		background-color: var(--color-muted);
	}

	.btn-ghost {
		background-color: transparent;
		color: var(--color-foreground);
	}

	.btn-ghost:hover:not(:disabled) {
		background-color: var(--color-muted);
	}

	.btn-destructive {
		background-color: var(--color-destructive);
		color: var(--color-destructive-foreground);
	}

	.btn-destructive:hover:not(:disabled) {
		opacity: 0.9;
	}

	/* Sizes */
	.btn-sm {
		height: 2rem; /* 32px */
		padding: 0 0.75rem;
		font-size: 0.875rem;
	}

	.btn-md {
		height: 2.5rem; /* 40px */
		padding: 0 1rem;
		font-size: 0.875rem;
	}

	.btn-lg {
		height: 3rem; /* 48px */
		padding: 0 1.5rem;
		font-size: 1rem;
	}
</style>
