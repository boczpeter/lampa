<svelte:head>
	<title>Lámpaszámlálás</title>
</svelte:head>
<script>
	let nums = [
		{value:0, name:'Első+hátsó'},
		{value:0, name:'Csak első'},
		{value:0, name:'Csak hátsó'},
		{value:0, name:'Egyik sem'},
	],
	meta = [
		{value:'', name: 'Város'},
		{value:'', name: 'Lakosságszám'},
		{value:'', name: 'Helyszín'},
	],
	sum = arr => arr.reduce((p, e) => p + e.value, 0),	// return sum of values
	line = e => `${e.name}: ${e.value}`,
	cancopy = true;

	function copy() {
		const text = [
			...meta.map(line),
			'Kerékpárosok száma: ' + sum(nums),
			...nums.map(line)
		].join('\n');
		console.log(this, text);

		navigator.clipboard.writeText(text).then(function() {
			console.log('clipboard successfully set');
		}, function() {
			console.log('clipboard write failed');
		});
	}
</script>

<main>
	<h1>Lámpaszámlálás</h1>
	<form on:submit|preventDefault="{copy}">
		<h2>Számolj&hellip;</h2>

		{#each nums as {name, value}}
		<div>{value}</div>
			<input type="button" value="-" class="dec" on:click="{e => value && --value}">
			<div>&#128692;</div>
			<input type="button" value="+" class="inc" on:click="{e => ++value}">
		{/each}
		<hr>
		<div class="sum">{sum(nums)}</div>

		<h2>&hellip;és add meg a hely adatait!</h2>
		{#each meta as {name, value}, i}
			<input type="text" bind:value placeholder="{name}">
		{/each}
		<input type="submit" value="Küldés (vágólapra)" disabled="{!cancopy}">
	</form>
</main>

<style>
	main {
		text-align: center;
	}
	form {
		display: grid;
		grid-template-columns: 1fr min-content min-content min-content;
		align-items: center;
		justify-items: center;
		width: 25rem;
		max-width: 100%;
		margin: 0 auto;
		gap: 0.5rem;
	}
	input[type="text"], input[type="submit"], h1, h2, hr {
		grid-column: 1 / -1;
		width: 100%;
		outline: #fff;
		white-space: nowrap;
	}
	input[type="submit"], .inc {
		cursor: pointer;
		background-color: #5a5;
		color: #fff;
		border-radius: 0.5rem;
		font-weight: bold;
		border: 1px solid #fff;
	}
	.dec {
		border: 1px solid #fff8;
		background-color: #a55;
	}
	.sum {
		font-weight: bold;
	}
	input[type="button"] {
		line-height: 1rem;
		width: 3rem;
		height: 2rem;
		max-width: 10vw;
		padding: 0.5rem;
		margin: 0;
		border-radius: 0.5rem;
		cursor: pointer;
	}
	input:active {
		box-shadow: 0 0 0.5rem rgb(200, 110, 0);
	}
	form > div {
		font-size: 200%;
	}
	h1 {
		color: rgb(200, 110, 0);
		text-shadow: 0 0 4px #f00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
		margin: 1rem auto;
	}
	h2 {
		color: rgb(200, 110, 0);
		font-size: 2em;
		font-weight: 400;
		margin: 1rem auto;
	}
</style>