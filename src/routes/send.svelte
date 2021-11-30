<script>
	import Popup from '$lib/Popup.svelte';
	import { popuptext } from '$lib/stores';
</script>

<Popup type='plain'>{$popuptext}</Popup>

<style>
</style>
