<script>
	import { latlng, externalLink } from '$lib/stores.js';
	import { fly, fade, slide, scale } from 'svelte/transition';
  import Map from '$lib/Map.svelte';
	import Icon from '@iconify/svelte';

  let popup = false;

  function ready(map, L, node) {
    map.locate({setView: true, maxZoom: 18});
    map.on('load', e => {
      map.on('move', e => { // .locate emits 'move', so we attach only after 'load'
        $latlng = map.getCenter();  // feed position back to main data
        // console.log($latlng.toString());
        popup = false;  // tear down popup on first map move
      });
      externalLink(node, '.leaflet-control-attribution a');
      popup = true;
    });
  }
</script>

<main>
  <Map {ready}/>
  {#if popup}
    <header transition:fly="{{ y: -500, duration: 500, delay: 2000 }}">
      <b>Tipp</b>: a térkép csúsztatásával pontosíthatod a helyszín pozícióját.
    </header>
  {/if}
  <mark><Icon icon="fa-solid:crosshairs"/></mark>
</main>

<style>
  main {
    display: grid;
    grid-template-areas: "map";
    height: 100vh;
    overflow: hidden;
  }
  header, mark {
    /* force them on top of map */
    grid-area: map;
    z-index: 1000;
  }
  header {
    text-align: center;
    padding: var(--gap);
    margin: var(--gap) 60px;
		border-radius: var(--gap);
    color: #000;
    background: #fff;
    place-self: start center;
    border: var(--contour) solid #000;
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
