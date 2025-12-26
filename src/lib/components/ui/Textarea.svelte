<script lang="ts">
	interface Props {
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		rows?: number;
		class?: string;
		id?: string;
		name?: string;
	}

	let {
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		required = false,
		rows = 4,
		class: className = '',
		id,
		name
	}: Props = $props();
</script>

<textarea
	{placeholder}
	{disabled}
	{required}
	{rows}
	{id}
	{name}
	bind:value
	class="textarea {className}"
></textarea>

<style>
	.textarea {
		width: 100%;
		padding: 0.75rem;
		background-color: var(--color-input);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-family: inherit;
		resize: vertical;
		transition: all 0.2s ease;
	}

	.textarea::placeholder {
		color: var(--color-muted-foreground);
	}

	.textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.textarea:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
