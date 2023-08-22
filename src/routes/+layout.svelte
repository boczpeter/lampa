<script>
	import '../app.css'
	import { afterNavigate } from '$app/navigation'
	import { payload, load, save, pb } from '$lib/stores.js'
	import Counter	from '$lib/Counter.svelte'
	import Form		  from '$lib/Form.svelte'
	import Icon			from '$lib/Icon.svelte'

	let popup = false // popup is shown above page

	const coll = 'users',
		rows = [
			{label:'Első+hátsó', name:'both' },
			{label:'Csak első ', name:'front'},
			{label:'Csak hátsó', name:'back' },
			{label:'Egyik sem ', name:'none' },
		],
		total = {label: 'Kerékpárosok száma', name: 'total', value: 0},
		meta = [
			{value:'', label: 'Neved/Nicked',	name: 'user',				icon:'user-circle'},
			{value:'', label: 'Város',				name: 'city',				icon:'city'},
			{value:'', label: 'Lakosságszám',	name: 'population',	icon:'users'},
			{value:'', label: 'Helyszín',			name: 'location',		icon:'map'},
			{value:'', label: 'GPS',					name: 'gps',				icon:'map-marker-alt'},
		],
		fields = [...meta, total, ...rows],

		onsubmit = e => payload.set(Object.fromEntries(fields.map(f => [f.name, ''+f.value])))

	// post-process fields
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

	afterNavigate(nav => popup = 1 < nav?.to?.route?.id?.length)
</script>

<form class:popup data-sveltekit-prefetch>
	<h1>Lámpaszámlálás</h1>
	<h2>Számolj…</h2>

	<Counter {rows} {total} />

	<h2>…és add meg a további adatokat!</h2>

	<Form {meta} />

	{#await pb.collection(coll).authWithPassword('lampa', 'lampaszamlalas') }
		<h3>Kapcsolódás…</h3>
	{:then resp}
		{#if resp?.record?.collectionName === coll}
			<a href=/send class=button role=button data-sveltekit-noscroll on:click={onsubmit}>Küldöm</a>
		{:else}
			<h3 class=error><Icon icon="bx:error-alt"/>Jelenleg nem tudsz adatokat beküldeni.</h3>
		{/if}
	{:catch error}
		<h3 class=error><Icon icon="bx:error-alt"/>Jelenleg nem tudsz adatokat beküldeni.</h3>
	{/await}
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
	h3 {
		display: flex;
		align-items: center;
		gap: 0.5em;
		font-size: var(--fonterr);
	}
</style>
