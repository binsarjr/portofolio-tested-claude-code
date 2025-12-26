<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Skeleton from '$lib/components/ui/Skeleton.svelte';
</script>

<Card>
	<Skeleton height="1.5rem" width="70%" class="title-skeleton" />
	<Skeleton height="3rem" width="100%" class="description-skeleton" />

	<div class="stats-skeleton">
		<Skeleton height="1rem" width="3rem" />
		<Skeleton height="1rem" width="3rem" />
	</div>

	<div class="topics-skeleton">
		<Skeleton height="1.5rem" width="4rem" />
		<Skeleton height="1.5rem" width="5rem" />
		<Skeleton height="1.5rem" width="4.5rem" />
	</div>

	<div class="footer-skeleton">
		<Skeleton height="1rem" width="6rem" />
		<Skeleton height="1rem" width="8rem" />
	</div>
</Card>

<style>
	:global(.title-skeleton) {
		margin-bottom: 0.75rem;
	}

	:global(.description-skeleton) {
		margin-bottom: 1rem;
	}

	.stats-skeleton {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.topics-skeleton {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.footer-skeleton {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}
</style>
