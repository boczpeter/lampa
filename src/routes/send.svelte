<script context="module">
	export const prerender = true;
</script>

<script>
	import Popup from '$lib/Popup.svelte';
	import { popuptext } from '$lib/stores';
</script>

<Popup type='plain'>{$popuptext}</Popup>
