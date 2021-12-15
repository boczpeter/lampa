<script>
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import { popuptext, latlng, copy } from '$lib/stores.js';
	import Counter	from '$lib/Counter.svelte';
	import Form		  from '$lib/Form.svelte';

	export let title = '';

	const data = new Map([
		['meta', [
			{value:'', 			name: 'Neved/Nicked',	icon:'user-circle'},
			{value:'', 			name: 'Város',				icon:'city'},
			{value:'', 			name: 'Lakosságszám',	icon:'users'},
			{value:$latlng, name: 'Helyszín',			icon:'map-marker-alt'},
		]],
		['all', [
			{name: 'Kerékpárosok száma', get value() { return data.get('nums').reduce((p,e) => p+e.value, 0) }}
		]],
		['nums', [
			{value:0, src:'3.png', name:'Első+hátsó'},
			{value:0, src:'1.png', name:'Csak első '},
			{value:0, src:'2.png', name:'Csak hátsó'},
			{value:0, src:'0.png', name:'Egyik sem '},
		]],
	]),
	send = e => {
		copy([...data.values()].flat().map(e => `${e.name}: ${e.value}`).join('\n'), popuptext);
		goto('send', {noscroll:true});
	};	// constants

</script>

<form>
	<h1>{title}</h1>
	<h2>Számolj&hellip;</h2>
	<Counter {data}/>
	<h2>&hellip;és add meg a további adatokat!</h2>
	<Form {data}/>
	<input type="submit" value="Küldöm (vágólapra)" on:click|preventDefault={send} class="full">
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