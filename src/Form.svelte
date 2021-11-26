<script>
	import Popup from './Popup.svelte';
	import Help  from './Help.svelte';
	import { clip } from './stores.js';

	export let cansend = true, title = '';

	let help = false;
	const data = new Map([
		['meta', [
			{value:'', name: 'Neved/Nicked'},
			{value:'', name: 'Város'},
			{value:'', name: 'Lakosságszám'},
			{value:'', name: 'Helyszín'},
		]],
		['all', {
			get value() { return data.get('nums').reduce((p,e) => p + e.value, 0) },
			name: 'Kerékpárosok száma'
		}],
		['nums', [
			{value:0, src:'3.png', name:'Első+hátsó'},
			{value:0, src:'1.png', name:'Csak első '},
			{value:0, src:'2.png', name:'Csak hátsó'},
			{value:0, src:'0.png', name:'Egyik sem '},
		]],
	]),
	getdata = () => [...data.values()].flat(),
	send = () => {
		cansend = false;
		console.log(getdata());
		clip.set( getdata().map(e => `${e.name}: ${e.value}`).join('\n') );
	};	// constants
</script>

<form>
	<h1>{title}</h1>

	<h2>Számolj&hellip;</h2>

	<section>
		{#each data.get('nums') as {name, value, src}}
		<output>{value}</output>
			<button type="button" class="dec" on:click="{e => value && --value}">&#8722;</button>
			<img {src} title="{name}" alt="{name}">
			<button type="button" class="inc" on:click="{e => ++value}">&#65291;</button>
		{/each}
		<hr>
		<output class="sum">{data.get('all').value}</output>
		<button type="button" class="help" on:click="{e => help = true}" title="Help">?</button>
	</section>

	<h2>&hellip;és add meg a további adatokat!</h2>
	{#each data.get('meta') as {name, value}}
		<input type="text" bind:value placeholder="{name}">
	{/each}
	<input type="submit" value="Küldöm (vágólapra)" disabled="{!cansend}" on:click|preventDefault="{send}">
</form>

<Popup bind:open={help}>
	<Help/>
</Popup>

<style>
	:global(body.popup) form {
		pointer-events: none;
		user-select: none;
		opacity: 0.3;
	}
	form {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
		justify-items: center;
		transition: var(--trans);
	}
	section {
		display: grid;
		grid-template-columns: 1fr min-content min-content min-content;
		align-items: center;
		justify-items: center;
		width: 100%;
		max-width: 50rem;
		gap: var(--gap);
	}
	section > output {
		font-size: var(--hugefont);
		text-shadow: 0 0 var(--contour) #000;
		line-height: var(--hugefont);
	}
	section > * {
		font-size: var(--bigfont);
		padding: 0;
		line-height: var(--bigfont);
	}
	hr {
		grid-column: 1 / -1;
	}
	button {
		width : calc(2 * var(--gap) + var(--bigfont));
		height: calc(2 * var(--gap) + var(--bigfont));
		border-radius: var(--radius);
	}
	.dec {
		background-color: var(--red);
	}
	.inc {
		background-color: var(--green);
		font-weight: bold;
	}
	.sum {
		font-weight: bold;
	}
	.help {
		border-radius: 50%;
		grid-column: -3 / -1;
	}
</style>