<script context="module">
	export const prerender = true;
</script>

<script>
	import Popup from '$lib/Popup.svelte';
	import { popuptext } from '$lib/stores';
</script>

<Popup type='plain'><output>{$popuptext}</output></Popup>

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
