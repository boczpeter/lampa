<script context="module">
	// export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';
	import Form  from './Form.svelte';
	import Help  from './Help.svelte';
	import Popup from './Popup.svelte';
	import { popuptext, help, open } from '$lib/stores.js';
	export let title = 'Lámpaszámlálás';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Form {title}/>

<Popup bind:open={$help}><Help/></Popup>

<Popup bind:open={$open} type='plain'>{$popuptext}</Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>
