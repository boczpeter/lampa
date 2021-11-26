<script>
	import Form  from './Form.svelte';
	import Popup from './Popup.svelte';
	import { clip } from './stores.js';
	export let title = '', bgcolor = '#fff';

	let open = false, popuptext = '', cansend = true;

	// copy store content to clipboard on value change
	clip.subscribe(content => content && navigator.clipboard.writeText(content)
		.then(() => console.info(popuptext = content))
		.catch(r => console.error(popuptext = 'clipboard write failed'))
		.finally(() => open = cansend = true)
	);
	document.body.style.backgroundColor = bgcolor;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="theme-color" content="{bgcolor}">
	<base target="_blank">
</svelte:head>

<Form  bind:cansend {title}/>

<Popup bind:open type='plain'>{popuptext}</Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>