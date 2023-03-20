<script>
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { clipboard, load, save } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	const
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

	afterNavigate(nav => popup = 1 < nav?.to?.route?.id?.length)
</script>

<svelte:head>
	<title>Lámpaszámlálás &mdash; Magyar Kerékpárosklub</title>
	<meta name=description content="Lámpaszámlálós applet a Magyar Kerékpárosklub felméréséhez" />
	<link rel=icon href=/bike.svg />
	<link rel="apple-touch-icon" sizes="200x200" href=/bike.png>
	<meta name=theme-color content=#333>
</svelte:head>

<form class:popup data-sveltekit-prefetch>
	<h1>Lámpaszámlálás</h1>
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

<slot />

<style>
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
