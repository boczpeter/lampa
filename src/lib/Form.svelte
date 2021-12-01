<script>
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import { popuptext } from '$lib/stores.js';
	import Icon from '@iconify/svelte';

	export let title = '';

	const data = new Map([
		['meta', [
			{value:'', name: 'Neved/Nicked', icon:'user-circle'},
			{value:'', name: 'Város', icon:'industry'},
			{value:'', name: 'Lakosságszám', icon:'group'},
			{value:'', name: 'Helyszín', icon:'map-marker'},
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
	action = 'send',
	send = e => {
		const text = [...data.values()].flat().map(e => `${e.name}: ${e.value}`).join('\n');	// put text in popup
		$popuptext = text;
		goto(action, {noscroll:true});
		navigator.clipboard.writeText(text)
			.then(() => console.info(text))
			.catch(r => console.error('clipboard write failed: '+r));
	};	// constants

</script>

<form>
	<h1>{title}</h1>

	<h2>Számolj&hellip;</h2>

	<section class="full">
		{#each data.get('nums') as {name, value, src}}
			<output>{value}</output>
			<button type="button" class="dec" on:click={e => value && --value} disabled={value < 1}><Icon icon="fa:minus"/></button>
			<img {src} title={name} alt={name}>
			<button type="button" class="inc" on:click={e => ++value}><Icon icon="fa:plus"/></button>
		{/each}
		<hr>
		{#each data.get('all') as {name, value}}
			<output class="sum" title={name}>{value}</output>
		{/each}
		<a href="help" class="icon" id="help" title="Help" sveltekit:noscroll sveltekit:prefetch><Icon icon="fa:question-circle-o"/></a>
	</section>

	<h2>&hellip;és add meg a további adatokat!</h2>
	{#each data.get('meta') as {name, value, icon}, id}
		<label class="icon" for="{id}"><Icon icon="fa:{icon}"/></label>
		<input {id} type="text" bind:value placeholder={name}>
	{/each}
	<input type="submit" value="Küldöm (vágólapra)" on:click|preventDefault={send} class="full">
</form>

<style>
	:global(body.popup) form {
		pointer-events: none;
		user-select: none;
		opacity: 0.3;
	}
	form {
		display: grid;
		grid-template-columns: var(--bigfont) 1fr;
		gap: var(--gap);
		padding: var(--gap);
		place-items: center;
		/* transition: var(--trans); */
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
		line-height: var(--bigfont);
	}
	hr {
		grid-column: 1 / -1;
	}
	button {
		border-radius: var(--radius);
		display: flex;
	}
	.dec {
		background-color: var(--red);
	}
	.inc {
		background-color: var(--green);
	}
	.sum {
		font-weight: bold;
	}
	#help {
		grid-column: -3 / -1;
		border-radius: 50%;
	}
	#help > :global(*) {
		font-size: var(--hugefont);
	}
	input[type="text"] {
		width: calc(100% - var(--gap));
	}
</style>