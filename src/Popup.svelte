<script>
  // import { fade } from 'svelte/transition';

  export let
    text = '',
    open = false;

  const
    close = () => open = false,
    keydown = e => e.key == 'Escape' && close();
</script>

<svelte:window on:keydown={keydown}/>

<aside>
	<code>{text}</code>
	<input type="submit" value="Bezárom" on:click|preventDefault="{close}">
</aside>

<style>
	aside {
		display: grid;
		gap: var(--gap);
		padding: var(--gap);
		justify-items: center;
		transition: var(--trans);
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
	:global(body.popup) aside {
		opacity: 1;
		top: var(--gap);
		pointer-events: auto;
	}
</style>
