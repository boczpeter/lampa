<svelte:head>
	<title>Lámpaszámlálás</title>
	<meta name="theme-color" content="#333">
</svelte:head>
<script>
	let nums = [
		{value:0, img:'3.png', name:'Első+hátsó'},
		{value:0, img:'1.png', name:'Csak első'},
		{value:0, img:'2.png', name:'Csak hátsó'},
		{value:0, img:'0.png', name:'Egyik sem'},
	],
	meta = [
		{value:'', name: 'Neved/Nicked'},
		{value:'', name: 'Város'},
		{value:'', name: 'Lakosságszám'},
		{value:'', name: 'Helyszín'},
	],
	sum = arr => arr.reduce((p, e) => p + e.value, 0),	// return sum of values
	line = e => `${e.name}: ${e.value}`,
	cancopy = true;

	function copy() {
		cancopy = false;
		const text = [
			...meta.map(line),
			'Kerékpárosok száma: ' + sum(nums),
			...nums.map(line)
		].join('\n');
		console.log(this, text);

		navigator.clipboard.writeText(text).then(function() {
			console.log('clipboard successfully set');
			cancopy = true;
		}, function() {
			console.log('clipboard write failed');
			cancopy = true;
		});
	}
</script>

<h1>Lámpaszámlálás</h1>
<h2>Számolj&hellip;</h2>

<form on:submit|preventDefault="{copy}" id="main">
	{#each nums as {name, value, img}}
	<div>{value}</div>
		<input type="button" value="&#65293;" class="dec" on:click="{e => value && --value}">
		<img src="{img}" title="{name}" alt="{name}">
		<input type="button" value="&#65291;" class="inc" on:click="{e => ++value}">
	{/each}
	<hr>
	<div class="sum">{sum(nums)}</div>
</form>

<h2>&hellip;és add meg a további adatokat!</h2>
{#each meta as {name, value}}
	<input type="text" bind:value placeholder="{name}" form="main">
{/each}
<input type="submit" value="Küldés (vágólapra)" disabled="{!cancopy}" form="main">

<style>
	form {
		display: grid;
		grid-template-columns: 1fr min-content min-content min-content;
		align-items: center;
		justify-items: center;
		width: 100%;
		max-width: 40rem;
		gap: 3vw;
	}
	input[type="text"], input[type="submit"], hr {
		width: 100%;
		max-width: 40rem;
	}
	input[type="text"]:focus {
		box-shadow: 0 0 0.5rem #c86e00;
	}
	input[type="submit"], .inc {
		cursor: pointer;
		background-color: #5a5;
		color: #fff;
		border-radius: 0.5rem;
		font-weight: bold;
		border: 1px solid #fffa;
	}
	input[type="button"] {
		line-height: 5vmin;
		font-size: 5vmin;
		width: 10vmin;
		height: 10vmin;
		padding: 0;
		border-radius: 2vmin;
		cursor: pointer;
	}

	.dec {
		border: 1px solid #fff4;
		background-color: #a55;
	}
	.sum {
		font-weight: bold;
	}
	form > div {
		font-size: 200%;
	}
	img {
		max-height: 10vw;
	}
	hr {
		grid-column: 1 / -1;
	}
	h1 {
		color: rgb(200, 110, 0);
		text-shadow: 0 0 4px #f00;
		text-transform: uppercase;
		font-size: 10vw;
		font-weight: 300;
		text-align: center;
	}
	h2 {
		color: rgb(200, 110, 0);
		font-size: 6vw;
		font-weight: 400;
		white-space: nowrap;
		text-align: center;
	}
</style>