<script>
	import Popup from '$lib/Popup.svelte';
	import Help  from './Help.md';
</script>

<Popup type=help>
	<Help/>
	<img src="/mklogo.png" alt="MK logo">
</Popup>

<style>
  img { /* MK logo */
    margin: auto;
    display: block;
    min-width: calc(10 * var(--font));
  }
</style>
