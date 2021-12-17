<script>
	import { popuptext, copy, latlng } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	export let title = '';

	const
		nums = [
			{value:0, src:'3.png', name:'Első+hátsó'},
			{value:0, src:'1.png', name:'Csak első '},
			{value:0, src:'2.png', name:'Csak hátsó'},
			{value:0, src:'0.png', name:'Egyik sem '},
		],
		all = {name: 'Kerékpárosok száma', get value() { return nums.reduce((p,e) => p+e.value, 0) }},
		meta = [
			{value:'', name: 'Neved/Nicked',	icon:'user-circle'},
			{value:'', name: 'Város',					icon:'city'},
			{value:'', name: 'Lakosságszám',	icon:'users'},
			{value:'', name: 'Helyszín',			icon:'map-marker-alt'},
		];

	latlng.subscribe(pos => {
		meta[3].value = pos;
		console.log('input', pos);
	});
</script>

<form>
	<h1>{title}</h1>
	<h2>Számolj&hellip;</h2>
	<Counter {nums} {all} />
	<h2>&hellip;és add meg a további adatokat!</h2>
	<Form {meta} />
	<a href="send" class="button" role="button" on:click={e => {
		const text = [meta, all, nums].flat().map(d => `${d.name}: ${d.value}`).join('\n');
		copy(text);
		$popuptext = text;
	}}>
	 	Küldöm (vágólapra)
	</a>
</form>

<style>
	form {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		padding: var(--gap);
		place-content: center;
	}
	:global(body.popup) > form {
		pointer-events: none;
		user-select: none;
		opacity: 0.3;
		/* position: fixed; */
		/* z-index: -1; */
	}
</style>