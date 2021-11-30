<script>
	// import { browser } from "$app/env";
  export let type = 'fullwidth';

  const
		close = () => history.back(),
    keydown = e => e.key == 'Escape' && close();

	// $: if (browser) document.body.classList.toggle('popup', open);
</script>

<svelte:window on:keydown={keydown}/>

<aside class={type} role="dialog" aria-modal="true">
	<output>
		<slot>&larr; popup text &rarr;</slot>
	</output>
	<input type="submit" value="Bezárom" on:click|preventDefault="{close}">
</aside>

<style>
	aside {
		display: grid;
		position: fixed;
		gap: var(--gap);
		padding: var(--gap);
		margin: var(--gap);
		max-width : calc(100vw - 2 * var(--gap));
		max-height: calc(100vh - 2 * var(--gap));
		justify-items: center;
		transition: var(--trans);
		background-color: #fff;
		border-radius: var(--gap);
		box-shadow: 0 0 1rem #000;
		top: 0;
	}
	aside.fullwidth {
		width : calc(100vw - 2 * var(--gap));
	}
	output {
		color: #000;
		font-size: var(--font);
		justify-self: start;
		max-height: calc(100vh - 7 * var(--gap) - var(--bigfont) - 2 * var(--contour));
		overflow-y: auto;
	}
	.plain output {
		white-space: pre-wrap;
		font-family: monospace;
	}
</style>
