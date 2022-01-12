<script>
	import Popup from '$lib/Popup.svelte';
	import { popuptext } from '$lib/stores';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let text = $popuptext;
	if (!text && browser)	goto(base || '/', { replaceState: true });	// back to main page if called from browser nav/reload
</script>

<Popup type='plain'><output>{text}</output></Popup>

<style>
	output {
		color: #000;
		font-size: var(--font);
		justify-self: start;
		max-height: calc(100vh - 7 * var(--gap) - var(--bigfont) - 2 * var(--contour));
		font-family: monospace;
		white-space: pre-line;
	}
</style>
