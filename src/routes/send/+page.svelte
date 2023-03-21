<script>
	import Popup from '$lib/Popup.svelte';
	import { payload, pb } from '$lib/stores';
  // import { browser } from '$app/environment';
	// import { goto } from '$app/navigation';
	// import { base } from '$app/paths';
	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	// console.debug('browser send')
	// 	pb.collection('posts').create({json:$payload}).then(
	// 		result => console.info(result)
	// 	).catch(
	// 		err => console.error(err)
	// 	)
	// });
	// $: console.log($payload)
</script>

<Popup>
{#await pb.collection('posts').create({json:$payload})}
	Küldés...
	<!-- promise is pending -->
{:then value}
	<!-- promise was fulfilled -->
	Sikeres beküldés!
	{JSON.stringify(value)}
{:catch error}
	Hiba: <i>{error?.response?.message}</i>

	Kérlek, próbáld újra később!
{/await}
</Popup>
