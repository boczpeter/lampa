<script>
	import '../app.css';
	import Main  from '$lib/Main.svelte';
	export let title = 'Lámpaszámlálás';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Lámpaszámlálós applet a Magyar Kerékpárosklub felméréséhez" />
	<link rel="icon" href="favicon.png" />
	<meta name="theme-color" content="#333">
</svelte:head>

<slot />
<Main {title}/>
