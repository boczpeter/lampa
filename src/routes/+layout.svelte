<script>
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { clipboard, load, save } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	const title = 'Lámpaszámlálás',
		rows = [
			{name:'Első+hátsó' },
			{name:'Csak első ', cls:'front'},
			{name:'Csak hátsó', cls:'back' },
			{name:'Egyik sem ', cls:'none' },
		],
		total = {name: 'Kerékpárosok száma', value: 0},
		meta = [
			{value:'', name: 'Neved/Nicked',	icon:'user-circle'},
			{value:'', name: 'Város',					icon:'city'},
			{value:'', name: 'Lakosságszám',	icon:'users'},
			{value:'', name: 'Helyszín',			icon:'map'},
			{value:'', name: 'GPS',						icon:'map-marker-alt'},
		],
		fields = [...meta, total, ...rows]

	rows.forEach(row => Object.defineProperties(row, {
		data: {value: 0, writable: true},
		value: {
			get: () => row.data,
			set: v => {
				if (0 <= row.data) {
					total.value += v - row.data
					row.data = v
					save(row)
				} else {	// catch for errors
					row.data = 0
				}
			}
		}
	}));

	fields.forEach((f, i) => load(Object.assign(f, {id: i})));	// add ID and load saved data

	let popup

	afterNavigate(e => popup = e?.to?.routeId)
</script>

<svelte:head>
	<title>{title}</title>
	<meta name=description content="Lámpaszámlálós applet a Magyar Kerékpárosklub felméréséhez" />
	<link rel=icon href=/bike.svg />
	<meta name=theme-color content=#333>
</svelte:head>

<form class:popup data-sveltekit-prefetch>
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

{#if popup}
	<section><slot /></section>
{/if}

<style>
	section {
		position: fixed;
		overflow: hidden;
		height: 100vh;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		padding: var(--gap);
		align-items: center;
	}
	form.popup {
		pointer-events: none;
		opacity: 0.3;
		overflow: hidden;
	}
</style>
