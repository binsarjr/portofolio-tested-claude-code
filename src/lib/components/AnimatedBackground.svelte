<script lang="ts">
	// Animated gradient mesh background
	// Creates a subtle, moving gradient effect that doesn't distract from content
</script>

<div class="animated-background">
	<div class="gradient-orb orb-1"></div>
	<div class="gradient-orb orb-2"></div>
	<div class="gradient-orb orb-3"></div>
	<div class="gradient-orb orb-4"></div>
</div>

<style>
	.animated-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
		background-color: var(--color-background);
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.15;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
		top: -200px;
		left: -200px;
		animation: float-1 20s infinite;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
		top: 50%;
		right: -150px;
		animation: float-2 25s infinite;
	}

	.orb-3 {
		width: 550px;
		height: 550px;
		background: radial-gradient(circle, #2563eb 0%, transparent 70%);
		bottom: -200px;
		left: 20%;
		animation: float-3 22s infinite;
	}

	.orb-4 {
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, #6366f1 0%, transparent 70%);
		top: 20%;
		left: 50%;
		animation: float-4 18s infinite;
	}

	@keyframes float-1 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(50px, 100px) scale(1.1);
		}
		66% {
			transform: translate(-30px, 50px) scale(0.9);
		}
	}

	@keyframes float-2 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-70px, 80px) scale(1.15);
		}
		66% {
			transform: translate(40px, -60px) scale(0.95);
		}
	}

	@keyframes float-3 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(80px, -50px) scale(0.9);
		}
		66% {
			transform: translate(-50px, 70px) scale(1.1);
		}
	}

	@keyframes float-4 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-60px, -80px) scale(1.05);
		}
		66% {
			transform: translate(70px, 60px) scale(0.92);
		}
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		.gradient-orb {
			animation: none;
		}
	}

	/* Reduce complexity on mobile for performance */
	@media (max-width: 768px) {
		.gradient-orb {
			filter: blur(60px);
			opacity: 0.1;
		}

		.orb-3,
		.orb-4 {
			display: none;
		}
	}
</style>
