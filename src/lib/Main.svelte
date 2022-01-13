<script>
	import { popuptext, copy } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	export let title = '';

	const
		nums = [
			{src:'3.png', name:'Első+hátsó'},
			{src:'1.png', name:'Csak első '},
			{src:'2.png', name:'Csak hátsó'},
			{src:'0.png', name:'Egyik sem '},
		],
		all = {name: 'Kerékpárosok száma', value: 0},
		meta = [
			{value:'', name: 'Neved/Nicked',	icon:'user-circle'},
			{value:'', name: 'Város',					icon:'city'},
			{value:'', name: 'Lakosságszám',	icon:'users'},
			{value:'', name: 'Helyszín',			icon:'map-marker-alt'},
		];

	nums.forEach(obj => Object.defineProperties(obj, {
		value: {value: 0, writable: true},
		inc: {
			set(v) {
				if (v) {
					obj.value++;
				} else if (obj.value) {
					obj.value--;
				}
				all.value = nums.reduce((s,n) => s+n.value, 0);
			}
		}
	}));
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
		opacity: 0.3;
		/* position: fixed; */
		/* z-index: -1; */
	}
</style>