<script>
	import Form  from './Form.svelte';
	import Help  from './Help.svelte';
	import Popup from './Popup.svelte';
	import { popuptext, help, open } from './stores.js';
	export let title = '';

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