<script>
	import Icon from '@iconify/svelte';
  export let nums, all;
</script>

<section>
  {#each nums as {name, value, src}}
    <output>{value}</output>
    <button type="button" on:click={e => value && --value} disabled={value < 1}><Icon icon="fa-solid:minus"/></button>
    <img {src} title={name} alt={name}>
    <button type="button" on:click={e => ++value}><Icon icon="fa-solid:plus"/></button>
  {/each}

  <hr class="full">

  <output title={all.name}>{all.value}</output>
  <a href="help" title="Help" role="button" sveltekit:prefetch><Icon icon="fa-solid:question-circle"/></a>
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
		font-size: var(--hugefont);
		grid-column: -3 / -1;
		border-radius: 50%;
  	color: #ccc;
  }
</style>
