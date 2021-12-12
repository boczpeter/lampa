<script>
	import { latlng } from '$lib/stores.js';
  import Map from '$lib/Map.svelte';
	import Icon from '@iconify/svelte';
	import { fly, fade, slide, scale } from 'svelte/transition';

  let zoom = 18, iconset = 'fa-solid', popup = false, out;

  function ready(map, L) {
    map.locate({setView: true, maxZoom: zoom});
    map.on('move', e => {
      $latlng = map.getCenter();
      // zoom = map.getZoom();
    });
    popup = true;
  }

$: if (out) out.querySelectorAll('a').forEach(a => Object.assign(a, {rel:'external', target:'_blank'}));  // postprocess all links
</script>

<main>
  <Map {ready} bind:this={out}/>
  {#if popup}
    <header transition:fly="{{ y: -500, duration: 300, delay: 2000 }}">
      Tipp: a térkép csúsztatásával pontosíthatod a helyszín pozícióját.
    </header>
  {/if}
  <mark><Icon icon="{iconset}:crosshairs"/></mark>
</main>

<style>
  main {
    display: grid;
    grid-template-areas: "map";
    height: 100vh;
    overflow: hidden;
  }
  header, mark {
    z-index: 1000;
    grid-area: map;
  }
  header {
    text-align: center;
    padding: 1em;
    margin: 1em;
    max-width: 80%;
    color: #000;
    background: #fff;
    justify-self: center;
    align-self: start;
    border: var(--contour) solid #000;
		border-radius: var(--gap);
		box-shadow: 0 0 1rem #000;
  }
  mark {
    color: #f00b;
    background: transparent;
    display: block;
    width: 2rem;
    height: 2rem;
    place-self: center;
  }
</style>
