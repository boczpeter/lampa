<script>
	import { externalLink } from '$lib/stores.js';
	import { fly } from 'svelte/transition';

	export let type = '' // popup class type

  const	close = () => history.back(),
			keydown = e => e.key == 'Escape' && close()
</script>
<svelte:window on:keydown={keydown}/>

<section transition:fly={{y:500,duration:300}}>
	<aside class={type} role=dialog aria-modal=true>
		<output use:externalLink={'a'}>
			<slot>&larr; popup text &rarr;</slot>
		</output>
		<input type=submit value="Bezárom" on:click|preventDefault={close}>
	</aside>
</section>

<style>
	section {
		position: fixed;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column-reverse;
	}
	aside {
		display: flex;
		flex-direction: column;
		grid-template-columns: auto;
		grid-template-rows: 1fr min-content;
		grid-template-areas: "popup-content" "button";
		gap: 						var(--gap);
		padding:				var(--gap);
		margin:					var(--gap);
		border-radius:	var(--gap);
		max-height: calc(100% - 2 * var(--gap));
		background-color: #fff;
		box-shadow: 0 0 1rem #000;
    overscroll-behavior: contain;
	}
	output {
		color: #000;
		font-size: var(--font);
	}
	aside.map {
		flex-grow: 1;
	}
	aside.map > output {
		display: grid;
		grid-template-areas: "map";
		flex-grow: 1;
	}
	aside.plain > output {
		font-family: monospace;
		white-space: pre-line;
		font-size: 1rem;
	}
	aside.help > output {
		overflow-y: auto;
		overscroll-behavior: none;
	}
	input {
		grid-area: button;
	}
</style>
