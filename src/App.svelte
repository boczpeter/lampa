<script>
	import Form  from './Form.svelte';
	import Popup from './Popup.svelte';
	import { clip } from './stores.js';
	export let title = '';

	let open = false, popuptext = '', cansend = true;

	// copy store content to clipboard on value change
	clip.subscribe(content => content && navigator.clipboard.writeText(content)
		.then(() => console.info(popuptext = content))
		.catch(r => console.error(popuptext = 'clipboard write failed'))
		.finally(() => open = cansend = true)
	);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Form  bind:cansend {title}/>

<Popup bind:open type='plain'>{popuptext}</Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>