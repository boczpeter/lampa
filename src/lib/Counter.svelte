<script>
	import Icon from '$lib/Icon.svelte'
  import icon_svg from '/static/bike.svg?src'

  export let rows = [], total = {}
</script>

<section>
  {#each rows as {name, label, value}}
    <output>{value}</output>
    <button type=button on:click={e => value--} disabled={value < 1}>
      <Icon icon=minus/>
    </button>
    <div class={name} title={label} role=img>
      {@html icon_svg}
    </div>
    <button type=button on:click={e => value++}>
      <Icon icon=plus/>
    </button>
  {/each}
  <hr class=full>

  <output class={total.name} title={total.label}>{total.value}</output>

  <a href="/help/" title=Help role=button data-sveltekit-noscroll>
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
    min-width: 2em;
    text-align: right;
  }
  output.total {
		font-weight: bold;
  }
  div {
    width : var(--hugefont);
    height: var(--hugefont);
  }
  div.front :global(.b), div.back :global(.f), div.none :global(g){
    stroke: var(--off);
  }
	button {
		display: flex;
		border-radius: var(--radius);
    font-size: var(--bigfont);
		background-color: var(--green);
		user-select: none;
    min-width:  calc(2em + 2 * var(--contour));
    min-height: calc(2em + 2 * var(--contour));
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
