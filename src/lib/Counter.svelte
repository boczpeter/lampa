<script>
	import Icon from '$lib/Icon.svelte';
  export let nums, all;
</script>

<section>
  {#each nums as {name, value, src, inc}}
    <output>{value}</output>
    <button type="button" on:click={e => inc=0} disabled={value < 1}><Icon icon=minus/></button>
    <img {src} title={name} alt={name}>
    <button type="button" on:click={e => inc=1}><Icon icon=plus/></button>
  {/each}

  <hr class="full">

  <output title={all.name}>{all.value}</output>
  <a href="help" title="Help" role="button" sveltekit:prefetch><Icon icon=question-circle/></a>
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
  output:last-of-type {
		font-weight: bold;
  }
  img {
    max-width: 3em;
  }
	button {
		display: flex;
    place-items: center;
    width: 2em;
    height: 2em;
		min-width: calc(1em + var(--font));
		border-radius: var(--radius);
    color: #eee;
    font-size: var(--bigfont);
		background-color: var(--green);
  }
  button:nth-of-type(odd) {
		background-color: var(--red);
  }
	a {
    display: flex;
    place-items: center;
		font-size: var(--hugefont);
		grid-column: -3 / -1;
		border-radius: 50%;
  	color: #ccc;
  }
</style>
