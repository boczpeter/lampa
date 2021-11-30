<script>
	import { fly, fade, slide, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	onMount(() => {
		document.body.classList.add('popup');
		return () => document.body.classList.remove('popup');
	});

  export let type = 'fullwidth';
  const
		close = () => history.back(),
    keydown = e => e.key == 'Escape' && close();
</script>

<svelte:window on:keydown={keydown}/>

<aside class={type} role="dialog" aria-modal="true" transition:fly="{{ y: -500, duration: 300 }}">
	<slot>&larr; popup text &rarr;</slot>
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
		/* transition: var(--trans); */
		background-color: #fff;
		border-radius: var(--gap);
		box-shadow: 0 0 1rem #000;
		top: 0;
	}
	aside.fullwidth {
		width : calc(100vw - 2 * var(--gap));
	}
</style>
