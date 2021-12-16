<script>
	import Icon from '@iconify/svelte';
  export let data, iconset = 'fa-solid';
</script>

<section>
  {#each data.get('meta') as {name, value, icon}, id}
    <label class="icon" for="i{id}" id="l{id}">
      <Icon icon="{iconset}:{icon}"/>
      <input type="text" bind:value placeholder={name} id="i{id}">
    </label>
    {#if id === 3}
      <a href="map" title="Pozíció lekérése" class="hover" role="button">
        <Icon icon="{iconset}:crosshairs"/>
      </a>
    {/if}
  {/each}
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
