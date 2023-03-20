<script>
	import Icon from '$lib/Icon.svelte'
  import InlineSVG from 'svelte-inline-svg'

  export let rows = [], total = {}
</script>

<section>
  {#each rows as {name, value, cls}}
    <output>{value}</output>
    <button type=button on:click={e => value--} disabled={value < 1}>
      <Icon icon=minus/>
    </button>
    <div class={cls} title={name} role=img>
      <InlineSVG src=/bike.svg />
    </div>
    <button type=button on:click={e => value++}>
      <Icon icon=plus/>
    </button>
  {/each}
  <hr class=full>

  <output title={total.name}>{total.value}</output>

  <a href=/help title=Help role=button data-sveltekit-noscroll>
    <Icon icon=question-circle/>
  </a>
</section>

<style>
	section {
		display: grid;
		place-items: center;
    width: fit-content;
		max-width: 100%;
		grid-template-columns: 1fr auto auto auto;
		gap: var(--gap);
	}
  output {
    font-size: var(--hugefont);
    text-shadow: 0 0 var(--contour) #000;
		user-select: none;
		padding-right:var(--gap2x);
  }
  output:last-of-type {
		font-weight: bold;
  }
  div {
    width : var(--hugefont);
    height: var(--hugefont);
  }
  div.front :global(.back), div.back :global(.front), div.none :global(g){
    stroke: var(--off);
  }
	button {
		display: flex;
		border-radius: var(--radius);
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
