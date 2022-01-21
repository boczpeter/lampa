<script>
	import Icon from '$lib/Icon.svelte';
</script>

<div class=error>
	<h2>Ilyen oldal nem található!</h2>
	<a href="/" role=button><Icon icon=arrow-left>Vissza a fő képernyőre</Icon></a>
</div>


<style>
	div {
		order: 2;
		display: flex;
		flex-direction: column;
		gap: 3em;
		place-items: center;
	}
	h2 {
		color: var(--red);
	}
	a {
		font-size: 1.5em;
  	background: #ccc;
		color: #333 !important;
		padding: var(--gap);
		margin: var(--gap);
		border-radius: 5em;
		text-align: center;
	}
	:global(.error ~ form > h1 ~ *) { /* hide all but h1 */
		display: none;
	}
</style>