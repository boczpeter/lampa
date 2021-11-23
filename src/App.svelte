<script>
	import Form  from './Form.svelte';
	import Popup from './Popup.svelte';

	let open = false, popuptext = '', cansend = true;

	function copy(e) {	// 'copy' event handler
		const text = e.detail.text;
		navigator.clipboard.writeText(text)
			.then(() => console.info(popuptext = text))
			.catch(r => console.error(popuptext = 'clipboard write failed'))
			.finally(() => open = cansend = true);
	}

	$: document.body.classList.toggle('popup', open);
</script>

<svelte:head>
	<title>{popuptext}Lámpaszámlálás</title>
	<meta name="theme-color" content="#333">
</svelte:head>

<Form bind:cansend on:copy={copy}></Form>
<Popup bind:open text={popuptext}></Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>