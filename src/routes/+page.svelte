<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
	<title>Binsar Dwi Jasuma - Software Engineer</title>
	<meta
		name="description"
		content="Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions."
	/>
</svelte:head>

<Hero />
<About />
<Projects />
<Contact />
