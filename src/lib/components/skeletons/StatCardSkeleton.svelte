<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
</script>

<Card class="stat-card">
	<Skeleton variant="circular" width="2.5rem" height="2.5rem" />
	<div class="stat-content">
		<Skeleton height="2rem" width="4rem" class="value-skeleton" />
		<Skeleton height="0.875rem" width="8rem" />
	</div>
</Card>

<style>
	:global(.stat-card) {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.5rem;
	}

	.stat-content {
		flex: 1;
	}

	:global(.value-skeleton) {
		margin-bottom: 0.25rem;
	}
</style>
