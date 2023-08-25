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
		columns = 'user city population location gps both front back none total updated'.split(' '),
		dl = e => {
			const values = data.map(rec => columns.map(c => rec[c])),	// ordered cell values
				table = [columns, ...values],	// add header
				csv = table.map(
					row => row.map(val => typeof val === 'number' ? val : `"${val}"`).join(',')
				).join('\n'),
				blob = new Blob([csv], { type: 'text/csv;charset=utf-8'})
			console.log(blob)
			e.target.href = URL.createObjectURL(blob)
		}

  onMount(() => pb.collection('users').authWithPassword('export', '123123123')
		.then(authData => pb.collection('posts').getFullList({
			filter: 'version='+getVersion(),
			sort: '-created',
		})).then(rows => data = rows)
  )
</script>

<main>
	<h3>Beküldött adatok
		<a href="blob:" download="lampa.csv" on:click={dl}>
			Letöltés
			<Icon icon=ic:sharp-download />
		</a>
	</h3>

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
		margin: 1rem;
	}
	a {
		margin-left: 2rem;
		color: #888;
		border: 1px solid;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 1rem;
	}
	a:hover {
		text-decoration: none;
		background: #444;
	}
</style>
