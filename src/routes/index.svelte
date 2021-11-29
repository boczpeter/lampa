<script>
	import Form  from '$lib/Form.svelte';
	import Help  from '$lib/Help.svelte';
	import Popup from '$lib/Popup.svelte';
	import { popuptext, help, open } from '$lib/stores';
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
