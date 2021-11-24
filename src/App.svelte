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

	$: document.body.classList.toggle('popup', open);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="theme-color" content="{bgcolor}">
</svelte:head>

<Form bind:cansend on:copy={copy} {title}></Form>
<Popup bind:open text={popuptext}></Popup>

<style>
	:global(body.popup) {
		overflow: hidden;
	}
</style>