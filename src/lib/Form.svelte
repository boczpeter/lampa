<script>
	import { latlng, save } from '$lib/stores.js';
	import Icon from '$lib/Icon.svelte';

	export let meta;

	const round = n => Number(n).toFixed(5);

	latlng.subscribe(pos => {
		if (!pos) return;
		meta[4].value = `[${ round(pos.lat) }, ${ round(pos.lng) }]`
		save(meta[4])
	})
</script>

<section>
  {#each meta as m}
    <label class=icon>
      <Icon icon={m.icon}/>
      <input type=text bind:value={m.value} placeholder={m.name} on:change={e=>save(m)}>
    </label>
	{/each}
	<a href="/map" title="Pozíció lekérése" role=button data-sveltekit-noscroll>
		<Icon icon=crosshairs/>
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
    flex-grow: 1;
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
	label:last-of-type {
		grid-column-end: span 1;
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
