<script>
	import '../app.css';
	import Main  from '$lib/Main.svelte';
	export let title = 'Lámpaszámlálás';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Main {title}/>

<slot />
