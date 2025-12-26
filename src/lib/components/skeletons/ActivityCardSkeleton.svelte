<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
</script>

<Card class="activity-item">
	<div class="activity-header">
		<Skeleton height="1.25rem" width="60%" />
		<Skeleton height="1.5rem" width="8rem" />
	</div>

	<Skeleton height="3rem" width="100%" class="description-skeleton" />

	<div class="activity-stats">
		<Skeleton height="1rem" width="3rem" />
		<Skeleton height="1rem" width="3rem" />
		<Skeleton height="1.5rem" width="5rem" />
	</div>

	<Skeleton height="1rem" width="9rem" />
</Card>

<style>
	.activity-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	:global(.description-skeleton) {
		margin-bottom: 1rem;
	}

	.activity-stats {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
	}
</style>
