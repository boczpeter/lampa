<script>
	import { fly } from 'svelte/transition';
  export let type = 'fullwidth';
  const
		close = () => history.back(),
    keydown = e => e.key == 'Escape' && close();
</script>

<svelte:window on:keydown={keydown}/>

<aside class={type} role=dialog aria-modal=true transition:fly={{y:500,duration:300}}>
	<slot>&larr; popup text &rarr;</slot>
	<input type=submit value="Bezárom" on:click|preventDefault={close}>
</aside>

<style>
	aside {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 1fr min-content;
		grid-template-areas: "popup-content" "button";
		position: fixed;
		z-index: 10;
		gap: 						var(--gap);
		padding:				var(--gap);
		margin:					var(--gap);
		border-radius:	var(--gap);
		bottom:	0;
		left: 0;
		right: 0;
		height: 100%;
		max-height: calc(100vh - 2 * var(--gap));
		background-color: #fff;
		box-shadow: 0 0 1rem #000;
	}
	aside.plain {	/* do not max out to full screen */
		height: fit-content;
	}
	input {
		grid-area: button;
	}
</style>
