<script>
	const nums = [
		{value:0, img:'3.png', name:'Első+hátsó'},
		{value:0, img:'1.png', name:'Csak első '},
		{value:0, img:'2.png', name:'Csak hátsó'},
		{value:0, img:'0.png', name:'Egyik sem '},
	],
	meta = [
		{value:'', name: 'Neved/Nicked'},
		{value:'', name: 'Város'},
		{value:'', name: 'Lakosságszám'},
		{value:'', name: 'Helyszín'},
	],
	sum = arr => arr.reduce((p, e) => p + e.value, 0),	// return sum of values
	line = e => `${e.name}: ${e.value}`,
	gettext = () => [
			...meta.map(line),
			'Kerékpárosok száma: ' + sum(nums),
			...nums.map(line)
		].join('\n');	// constants

	let popup = '',	cancopy = true;

	$: document.body.classList.toggle('popup', popup);

	function copy() {
		cancopy = false;
		const text = gettext();

		navigator.clipboard.writeText(text).then(function() {
			popup = text;
			cancopy = true;
		}, function() {
			console.error('clipboard write failed');
			popup = 'clipboard write failed';
			cancopy = true;
		});

	}

	function keydown(e) {
		if (e.key == 'Escape') {
			popup = '';
		}
	}
</script>

<svelte:head>
	<title>Lámpaszámlálás</title>
	<meta name="theme-color" content="#333">
</svelte:head>

<svelte:window on:keydown={keydown}/>

<main class:popup>
	<h1>Lámpaszámlálás</h1>
	<h2>Számolj&hellip;</h2>

	<form on:submit|preventDefault="{copy}" id="main">
		{#each nums as {name, value, img}}
		<output>{value}</output>
			<input type="button" value="&#65293;" class="dec" on:click="{e => value && --value}">
			<img src="{img}" title="{name}" alt="{name}">
			<input type="button" value="&#65291;" class="inc" on:click="{e => ++value}">
		{/each}
		<hr>
		<output class="sum">{sum(nums)}</output> &nbsp;
	</form>

	<h2>&hellip;és add meg a további adatokat!</h2>
	{#each meta as {name, value}}
		<input type="text" bind:value placeholder="{name}" form="main">
	{/each}
	<input type="submit" value="Küldöm (vágólapra)" disabled="{!cancopy}" form="main">

</main>

<aside>
	<code>{popup}</code>
	<input type="submit" value="Bezárom" on:click|preventDefault="{e => popup = ''}">
</aside>


<style>
	main, aside {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
		justify-items: center;
		transition: 300ms;
	}
	aside {
		position: fixed;
		align-content: space-between;
		background-color: #fff;
		border-radius: var(--gap);
		box-shadow: 0 0 1rem #000;
		left: var(--gap);
		bottom: -10vh;
		opacity: 0;
		pointer-events: none;
		max-width: calc(100vw - 2 * var(--gap));
	}
	aside > code {
		color: #000;
		justify-self: start;
		white-space: pre-wrap;
		font-size: var(--bigfont);
	}
	main.popup {
		pointer-events: none;
		user-select: none;
		opacity: 0.3;
	}
	main.popup + aside {
		opacity: 1;
		bottom: var(--gap);
		pointer-events: all;
	}
	form {
		display: grid;
		grid-template-columns: 1fr min-content min-content min-content;
		align-items: center;
		justify-items: center;
		width: 100%;
		max-width: 50rem;
		gap: var(--gap);
	}
	form > output {
		font-size: var(--hugefont);
		text-shadow: 0 0 var(--contour) #000;
	}
	form > * {
		font-size: var(--bigfont);
		padding: 0;
		line-height: 1.5em;
		max-width: 25vw;
	}
	input {
		cursor: pointer;
		color: #fff;
	}
	input[type="button"] {
		width: 15vw;
		height: 15vw;
		border-radius: var(--radius);
	}
	input[type="text"], input[type="submit"], hr {
		width: 100%;
		max-width: 40rem;
	}
	input[type="text"]:focus {
		box-shadow: 0 0 var(--radius) var(--hl);
	}
	input[type="submit"], .inc {
		background-color: #5a5;
		font-size: var(--bigfont);
		font-weight: bold;
		border-radius: var(--radius);
	}
	.dec {
		background-color: #a55;
	}
	.sum {
		font-weight: bold;
	}
	hr {
		grid-column: 1 / -1;
	}
	h1, h2 {
		color: var(--hl);
		font-weight: 400;
		text-align: center;
	}
	h1 {
		text-shadow: 0 0 var(--contour) #f00;
		font-size: 10vw;
		text-transform: uppercase;
	}
	h2 {
		text-shadow: 0 0 var(--contour) #000;
		font-size: 6vw;
		white-space: nowrap;
	}
</style>