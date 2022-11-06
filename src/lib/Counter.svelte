<script>
	import Icon from '$lib/Icon.svelte';
  import InlineSVG from 'svelte-inline-svg'
  export let nums, all;
  let svg = '/bike.svg'
</script>

<section>
  {#each nums as {name, value, src, inc, cls}}
    <output>{value}</output>
    <button type=button on:click={e => inc=0} disabled={value < 1}><Icon icon=minus/></button>
    <div class={cls} title={name}><InlineSVG src={svg} /></div>
    <!-- <img {src} title={name} alt={name}> -->
    <button type=button on:click={e => inc=1}><Icon icon=plus/></button>
  {/each}

  <hr class="full">

  <output title={all.name}>{all.value}</output>
  <a href="/help" title=Help role=button data-sveltekit-prefetch data-sveltekit-noscroll><Icon icon=question-circle/></a>
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
		user-select: none;
  }
  output:last-of-type {
		font-weight: bold;
  }
  div {
    width: var(--hugefont);
    height: var(--hugefont);
  }
  /* img {
    max-width: 3em;
  } */
	button {
		display: flex;
    place-items: center;
		border-radius: var(--radius);
    color: #eee;
    font-size: var(--bigfont);
		background-color: var(--green);
		user-select: none;
  }
  button:nth-of-type(odd) {
		background-color: var(--red);
  }
	a {
    display: flex;
    place-items: center;
		font-size: var(--font2dyn);
		grid-column: -3 / -1;
		border-radius: 50%;
  	color: #ccc;
  }
</style>
