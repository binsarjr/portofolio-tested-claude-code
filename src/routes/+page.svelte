<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	// Structured data for SEO - Person schema
	const personSchema = {
		'@type': 'Person',
		'name': 'Binsar Dwi Jasuma',
		'jobTitle': 'Software Engineer',
		'description': 'Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions.',
		'url': 'https://binsarjr.com',
		'sameAs': [
			'https://github.com/binsarjr',
			'https://binsarjr.com'
		],
		'knowsAbout': [
			'TypeScript',
			'JavaScript',
			'Python',
			'Svelte',
			'SvelteKit',
			'React',
			'Node.js',
			'Web Development',
			'Data Extraction',
			'Web Scraping',
			'API Development',
			'Open Source'
		],
		'alumniOf': {
			'@type': 'EducationalOrganization',
			'name': 'Software Engineering'
		}
	};

	// WebSite schema
	const websiteSchema = {
		'@type': 'WebSite',
		'name': 'Binsar Dwi Jasuma - Portfolio',
		'url': 'https://binsarjr.com',
		'description': 'Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions.',
		'author': {
			'@type': 'Person',
			'name': 'Binsar Dwi Jasuma'
		}
	};

	// WebPage schema
	const webPageSchema = {
		'@type': 'WebPage',
		'name': 'Binsar Dwi Jasuma - Software Engineer',
		'url': 'https://binsarjr.com/',
		'description': 'Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions.',
		'isPartOf': {
			'@type': 'WebSite',
			'name': 'Binsar Dwi Jasuma - Portfolio',
			'url': 'https://binsarjr.com'
		},
		'about': {
			'@type': 'Person',
			'name': 'Binsar Dwi Jasuma'
		},
		'primaryImageOfPage': {
			'@type': 'ImageObject',
			'url': 'https://binsarjr.com/og-image.png',
			'width': '1200',
			'height': '630'
		}
	};
</script>

<svelte:head>
	<title>Binsar Dwi Jasuma - Software Engineer</title>
	<meta
		name="description"
		content="Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://binsarjr.com/" />
	<meta property="og:title" content="Binsar Dwi Jasuma - Software Engineer" />
	<meta property="og:description" content="Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions." />
	<meta property="og:image" content="https://binsarjr.com/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://binsarjr.com/" />
	<meta name="twitter:title" content="Binsar Dwi Jasuma - Software Engineer" />
	<meta name="twitter:description" content="Software engineer passionate about building elegant solutions. Specializing in web development, data extraction, and open-source contributions." />
	<meta name="twitter:image" content="https://binsarjr.com/og-image.png" />

	<!-- Additional SEO -->
	<meta name="author" content="Binsar Dwi Jasuma" />
	<meta name="keywords" content="software engineer, web development, TypeScript, Svelte, SvelteKit, open source, data extraction, full-stack developer" />
	<link rel="canonical" href="https://binsarjr.com/" />
</svelte:head>

<StructuredData data={[personSchema, websiteSchema, webPageSchema]} />

<Hero />
<About />
<Projects />
<Contact />
