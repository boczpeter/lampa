<script>
	import '../app.css';
	import { clipboard } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	export let title = 'Lámpaszámlálás';

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
		];

	rows.forEach(obj => Object.defineProperties(obj, {
		data: {value: 0, writable: true},
		value: {
			get: () => obj.data,
			set: v => {
				if (0 <= obj.data) {
					total.value += v - obj.data
					obj.data = v
				} else {	// catch for errors
					obj.data = 0
				}
			}
		}
	}));
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
		$clipboard = [meta, total, rows].flat().map(d => `${d.name}: ${d.value}`).join('\n')
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
