<script>
	const data = {
		nums : [
			{value:0, src:'3.png', name:'Első+hátsó'},
			{value:0, src:'1.png', name:'Csak első '},
			{value:0, src:'2.png', name:'Csak hátsó'},
			{value:0, src:'0.png', name:'Egyik sem '},
		],
		all : {value:0, name: 'Kerékpárosok száma'},
		meta : [
			{value:'', name: 'Neved/Nicked'},
			{value:'', name: 'Város'},
			{value:'', name: 'Lakosságszám'},
			{value:'', name: 'Helyszín'},
		]
	},
	calc = () => data.all.value = data.nums.reduce((p, e) => p + e.value, 0),
	getdata = () => ['meta','all','nums'].map(k => data[k]).flat();	// constants

	let popup = false, popuptext = '', cancopy = true;

	$: document.body.classList.toggle('popup', popup);

	function copy() {
		cancopy = false;
		console.log(getdata());
		const text = getdata().map(e => `${e.name}: ${e.value}`).join('\n');
		navigator.clipboard.writeText(text).then(function() {
			popuptext = text;
			popup = true;
			cancopy = true;
		}, function() {
			console.error('clipboard write failed');
			popuptext = 'clipboard write failed';
			popup = true;
			cancopy = true;
		});

	}

	function keydown(e) {
		if (e.key == 'Escape') {
			popup = false;
		}
	}
</script>

<svelte:head>
	<title>Lámpaszámlálás</title>
	<meta name="theme-color" content="#333">
</svelte:head>

<svelte:window on:keydown={keydown}/>

<form class:popup>
	<h1>Lámpaszámlálás</h1>
	<h2>Számolj&hellip;</h2>

	<section>
		{#each data.nums as {name, value, src}}
		<output>{value}</output>
			<input type="button" value="&#65293;" class="dec" on:click="{e => {value && --value; calc()}}">
			<img {src} title="{name}" alt="{name}">
			<input type="button" value="&#65291;" class="inc" on:click="{e => ++value && calc()}">
		{/each}
		<hr>
		<output class="sum">{data.all.value}</output> &nbsp;
	</section>

	<h2>&hellip;és add meg a további adatokat!</h2>
	{#each data.meta as {name, value}}
		<input type="text" bind:value placeholder="{name}">
	{/each}
	<input type="submit" value="Küldöm (vágólapra)" disabled="{!cancopy}" on:click|preventDefault="{copy}">
</form>

<aside>
	<code>{popuptext}</code>
	<input type="submit" value="Bezárom" on:click|preventDefault="{e => popup = false}">
</aside>


<style>
	form, aside {
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
		top: -20%;
		opacity: 0;
		pointer-events: none;
		max-width: calc(100vw - 2 * var(--gap));
	}
	aside > code {
		color: #000;
		justify-self: start;
		white-space: pre-wrap;
		font-size: 1rem;
	}
	form.popup {
		pointer-events: none;
		user-select: none;
		opacity: 0.3;
	}
	form.popup + aside {
		opacity: 1;
		top: var(--gap);
		pointer-events: auto;
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
	output {
		font-size: var(--hugefont);
		text-shadow: 0 0 var(--contour) #000;
	}
	section > * {
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