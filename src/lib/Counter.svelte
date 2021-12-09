<script>
	import Icon from '@iconify/svelte';
  export let data, iconset = 'fa-solid';
</script>

<section>
  {#each data.get('nums') as {name, value, src}}
    <output>{value}</output>
    <button type="button" class="dec" on:click={e => value && --value} disabled={value < 1}><Icon icon="{iconset}:minus"/></button>
    <img {src} title={name} alt={name}>
    <button type="button" class="inc" on:click={e => ++value}><Icon icon="{iconset}:plus"/></button>
  {/each}

  <hr class="full">
  {#each data.get('all') as {name, value}}
    <output class="sum" title={name}>{value}</output>
  {/each}
  <a href="help" title="Help" class="hover" sveltekit:prefetch><Icon icon="{iconset}:question-circle"/></a>
</section>

<style>
	section {
		display: grid;
		place-items: center;
		max-width: 50rem;
		grid-template-columns: 1fr auto auto auto;
		gap: var(--gap);
	}
  output {
    font-size: var(--hugefont);
    text-shadow: 0 0 var(--contour) #000;
    line-height: var(--hugefont);
  }
  img {
    max-width: 3em;
  }
	button {
		display: flex;
    width: 2em;
    height: 2em;
		min-width: calc(1em + var(--font));
		border-radius: var(--radius);
    color: #eee;
    font-size: var(--bigfont);
  }
	a {
    display: flex;
		font-size: var(--hugefont);
		grid-column: -3 / -1;
		border-radius: 50%;
  	color: #ccc;
  }
	.dec {
		background-color: var(--red);
	}
	.inc {
		background-color: var(--green);
	}
	.sum {
		font-weight: bold;
	}
</style>
