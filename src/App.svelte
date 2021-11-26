<script>
	import Form  from './Form.svelte';
	import Popup from './Popup.svelte';
	export let title = '', bgcolor = '#fff';

	let open = false, popuptext = '', cansend = true;

	function copy(e) {	// 'copy' event handler
		const text = e.detail.text;
		navigator.clipboard.writeText(text)
			.then(() => console.info(popuptext = text))
			.catch(r => console.error(popuptext = 'clipboard write failed'))
			.finally(() => open = cansend = true);
	}

	document.body.style.backgroundColor = bgcolor;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="theme-color" content="{bgcolor}">
	<base target="_blank">
</svelte:head>

<Form  bind:cansend on:copy={copy} {title}/>

<Popup bind:open type='plain'>{popuptext}</Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>