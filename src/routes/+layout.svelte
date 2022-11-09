<script>
	import '../app.css';
	import { clipboard, rows, total, meta, fields } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	const title = 'Lámpaszámlálás'
</script>

<svelte:head>
	<title>{title}</title>
	<meta name=description content="Lámpaszámlálós applet a Magyar Kerékpárosklub felméréséhez" />
	<link rel=icon href=/bike.svg />
	<meta name=theme-color content=#333>
</svelte:head>

<slot />
<form>
	<h1>{title}</h1>
	<h2>Számolj&hellip;</h2>

	<Counter {rows} {total} />

	<h2>&hellip;és add meg a további adatokat!</h2>

	<Form {meta} />

	<a href=/send class=button role=button data-sveltekit-noscroll on:click={e =>
		$clipboard = fields.map(f => `${f.name}: ${f.value}`).join('\n')
	}>
	 	Küldöm (vágólapra)
	</a>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: var(--gap);
		align-items: center;
	}
	:global(aside) + form {
		pointer-events: none;
		opacity: 0.3;
	}
</style>
