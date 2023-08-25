<script>
	import Popup from '$lib/Popup.svelte';
	import Icon from '$lib/Icon.svelte'
	import { apiURL, getVersion } from '$lib/stores'
  import { onMount } from 'svelte'
	import PocketBase from 'pocketbase'
	import Grid from "gridjs-svelte"
	import '$lib/app.css'

	let loggedin = false, data = null

  const pb = new PocketBase(apiURL),	// admin instance
		columns = 'user city population location gps both front back none total updated'.split(' ')

  onMount(() => pb.collection('users').authWithPassword('export', '123123123')
		.then(authData => pb.collection('posts').getFullList({
			filter: 'version='+getVersion(),
			sort: '-created',
		})).then(rows => data = rows)
  )
</script>

<main>
	<h3>Beküldött adatok</h3>

	{#if data}
		<Grid {data} {columns} />
	{/if}
</main>

<style>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

	main {
		padding: 1rem;
	}
	h3 {
		font-size: 150%;
		text-align: center;
	}
</style>
