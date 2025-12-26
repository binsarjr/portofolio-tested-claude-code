<script lang="ts">
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		id?: string;
		name?: string;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		required = false,
		class: className = '',
		id,
		name
	}: Props = $props();
</script>

<input
	{type}
	{placeholder}
	{disabled}
	{required}
	{id}
	{name}
	bind:value
	class="input {className}"
/>

<style>
	.input {
		width: 100%;
		height: 2.5rem;
		padding: 0 0.75rem;
		background-color: var(--color-input);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.input::placeholder {
		color: var(--color-muted-foreground);
	}

	.input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
