<script>
	import { externalLink } from '$lib/stores.js';
	import { fly } from 'svelte/transition';

	export let type

	let out
  $: externalLink(out, 'a')  // postprocess all links in markdown

  const	close = () => history.back(),
			keydown = e => e.key == 'Escape' && close()
</script>
<svelte:window on:keydown={keydown}/>

<aside class={type} role=dialog aria-modal=true transition:fly={{y:500,duration:300}}>
	<output bind:this={out}>
		<slot>&larr; popup text &rarr;</slot>
	</output>
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
		max-height: calc(100vh - 2 * var(--gap));
		background-color: #fff;
		box-shadow: 0 0 1rem #000;
    overscroll-behavior: none;
	}
	output {
		color: #000;
		font-size: var(--font);
	}
	aside.map {
		height: 100vh;
	}
	aside.map > output {
		display: contents;
	}
	aside.plain > output {
		font-family: monospace;
		white-space: pre-line;
	}
	aside.help > output {
		overflow-y: auto;
		overscroll-behavior: none;
	}
	input {
		grid-area: button;
	}
</style>
