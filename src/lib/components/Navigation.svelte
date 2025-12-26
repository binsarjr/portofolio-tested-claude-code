<script lang="ts">
	import { page } from '$app/stores';

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Skills', href: '/skills' },
		{ label: 'Activity', href: '/activity' },
		{ label: 'Contact', href: '/#contact' }
	];

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleNavClick(e: MouseEvent) {
		const target = e.currentTarget as HTMLAnchorElement;
		const href = target.getAttribute('href');

		// Close menu for any navigation, including anchor links
		if (href?.startsWith('/#') || href === '/') {
			// Small delay to ensure smooth closing
			setTimeout(() => {
				mobileMenuOpen = false;
			}, 100);
		} else {
			mobileMenuOpen = false;
		}
	}
</script>

<nav class="nav">
	<div class="nav-container">
		<a href="/" class="logo">
			<span class="logo-name">Binsar Dwi Jasuma</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="nav-links">
			{#each navItems as item (item.href)}
				<a href={item.href} class="nav-link" class:active={$page.url.pathname === item.href}>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Mobile Menu Button -->
		<button class="mobile-menu-btn" onclick={toggleMobileMenu} aria-label="Toggle menu">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				{#if mobileMenuOpen}
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				{:else}
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="mobile-menu-link"
					class:active={$page.url.pathname === item.href}
					onclick={handleNavClick}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		width: 100%;
		background-color: rgba(9, 9, 11, 0.8);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
	}

	.nav-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-foreground);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.logo:hover {
		color: var(--color-primary);
	}

	.nav-links {
		display: none;
		gap: 2rem;
		align-items: center;
	}

	.nav-link {
		color: var(--color-muted-foreground);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
		position: relative;
	}

	.nav-link:hover {
		color: var(--color-foreground);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		right: 0;
		height: 2px;
		background-color: var(--color-primary);
	}

	.mobile-menu-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: transparent;
		border: none;
		color: var(--color-foreground);
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.mobile-menu-btn:hover {
		color: var(--color-primary);
	}

	.mobile-menu {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.mobile-menu-link {
		padding: 0.75rem 1rem;
		color: var(--color-muted-foreground);
		text-decoration: none;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.mobile-menu-link:hover {
		background-color: var(--color-muted);
		color: var(--color-foreground);
	}

	.mobile-menu-link.active {
		background-color: var(--color-primary);
		color: var(--color-primary-foreground);
	}

	/* Desktop styles */
	@media (min-width: 768px) {
		.nav-links {
			display: flex;
		}

		.mobile-menu-btn {
			display: none;
		}

		.mobile-menu {
			display: none;
		}
	}
</style>
