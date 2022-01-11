<script>
	import Popup from '$lib/Popup.svelte';
	import Help  from '$lib/Help.md';
	import { externalLink } from '$lib/stores.js';
  let out;
  $: externalLink(out, 'a');  // postprocess all links in markdown
</script>

<Popup>
	<output bind:this={out}>
		<Help/>
		<img src="mklogo.png" alt="MK logo">
	</output>
</Popup>

<style>
  img { /* MK logo */
    margin: auto;
    display: block;
    min-width: calc(10 * var(--font));
  }
	output {
		color: #000;
		font-size: var(--font);
		overflow-y: auto;
    overscroll-behavior: none;
    grid-area: popup-content;
	}
</style>
