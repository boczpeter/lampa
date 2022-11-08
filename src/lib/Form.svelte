<script>
	import { latlng } from '$lib/stores.js';
	import Icon from '$lib/Icon.svelte';
  export let meta;

	$: meta[4].value = $latlng
</script>

<section>
  {#each meta as {name, value, icon}, id}
    <label class=icon id="l{id}">
      <Icon {icon}/>
      <input type=text bind:value placeholder={name}>
    </label>
	{/each}
	<a href="/map" title="Pozíció lekérése" role=button data-sveltekit-noscroll><Icon icon=crosshairs/></a>
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
	}
	#l4 {
		grid-column-end: span 1;
	}
	label {
		display: flex;
    color: #888;
    align-items: center;
    justify-content: space-between;
		grid-column-end: span 2;
		font-size: var(--fontdyn);
    gap: var(--gap);
	}
	a {
    display: flex;
    place-items: center;
		font-size: var(--font2dyn);
		border-radius: var(--radius);
  	color: #ccc;
		margin-block: var(--gap-1);
  }
</style>
