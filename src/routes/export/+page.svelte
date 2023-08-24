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
		// .then(rows => console.info(cols.join(', ')))
		// .finally(() => console.info(pb.authStore))
  )
</script>

<h3>Beküldött adatok</h3>

{#if data}
	<Grid {data} {columns} />
	{/if}

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
