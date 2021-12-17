<script>
	import { latlng } from '$lib/stores.js';
	import Icon from '@iconify/svelte';
  export let meta;

	$: {
		let c = $latlng;
		console.log('subs', c);
		meta[3].value = c || 'xxx';
		// meta = meta;
		// console.log('loc', data.get('meta')[3].value);
		console.log('meta', meta);
	}
</script>

<section>
  {#each meta as {name, value, icon}, id}
    <label class="icon" for="i{id}" id="l{id}">
      <Icon icon="fa-solid:{icon}"/>
      <input type="text" bind:value placeholder={name} id="i{id}">
    </label>
	{/each}
	<a href="map" title="Pozíció lekérése" class="hover" role="button">
		<Icon icon="fa-solid:crosshairs"/>
	</a>
</section>

<style>
	section {
		display: grid;
		gap: var(--gap);
		grid-template-columns: 1fr auto;
    align-items: center;
	}
	input {
    width: 100%;
    margin-left: var(--gap);
	}
	#l3 {
		grid-column-end: span 1;
	}
	label {
		display: flex;
    color: #888;
    align-items: center;
    justify-content: space-between;
		grid-column-end: span 2;
	}
	:global(label > .iconify) {
		width: max(1em,5vw);
		height: max(1em,5vw);
	}
	a {
    display: flex;
		font-size: var(--bigfont);
		border-radius: var(--radius);
  	color: #ccc;
  }
</style>
