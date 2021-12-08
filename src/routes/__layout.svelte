<script>
	import '../app.css';
	import Form  from '$lib/Form.svelte';
	export let title = 'Lámpaszámlálás';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Form {title}/>

<slot />

<style>
	/* :global(body.popup) {
		overflow: hidden;
	} */
</style>
