<script>
  export let
    message = '',
    open = false,
		type = '';

  const
		close = () => open = false,
    keydown = e => e.key == 'Escape' && close();

	$: document.body.classList.toggle('popup', open);
</script>

<svelte:window on:keydown={keydown}/>

<aside class:open>
	<output class={type}>
		{#if message}
			{message}
		{:else}
			 <!-- <Help.hu.md/> -->
		{/if}
	</output>
	<input type="submit" value="Bezárom" on:click|preventDefault="{close}">
</aside>

<style>
	aside {
		display: grid;
		position: fixed;
		gap: var(--gap);
		padding: var(--gap);
		max-width : calc(100vw - 2 * var(--gap));
		max-height: calc(100vh - 2 * var(--gap));
		justify-items: center;
		align-content: space-between;
		transition: var(--trans);
		background-color: #fff;
		border-radius: var(--gap);
		box-shadow: 0 0 1rem #000;
		left: var(--gap);
		/* will change on open: */
		opacity: 0;
		top: -20%;
		pointer-events: none;
	}
	aside.open {
		opacity: 1;
		top: var(--gap);
		pointer-events: auto;
	}
	output {
		color: #000;
		font-size: var(--font);
		justify-self: start;
	}
	output.plain {
		white-space: pre-wrap;
		font-family: monospace;
	}
</style>
