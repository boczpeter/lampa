<script>
	import Popup from '$lib/Popup.svelte';
	import Icon from '$lib/Icon.svelte'
	import { apiURL } from '$lib/stores'
  import { onMount } from 'svelte'
	import PocketBase from 'pocketbase'

	let loggedin = false, list = []

  const pb = new PocketBase(apiURL),	// admin instance
		cols = 'user city population location gps both front back none total updated'.split(' ')

  onMount(() => pb.collection('users').authWithPassword('export', '123123123')
		.then(authData => pb.collection('posts').getFullList({sort: '-created'}))
		.then(data => list = data.map(rec => cols.map(col => rec[col])))
		// .finally(() => console.info(pb.authStore))
  )

</script>

<Popup type=help>
	{JSON.stringify(cols)}<br>
	{#each list as post}
		{JSON.stringify(post)}<br>
	{/each}
</Popup>

<style>
</style>
