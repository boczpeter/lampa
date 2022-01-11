<script>
	import { latlng, externalLink } from '$lib/stores.js';
	import { fly, fade, slide, scale } from 'svelte/transition';
  import Map   from '$lib/Map.svelte';
	import Popup from '$lib/Popup.svelte';
	import Icon  from '@iconify/svelte';

  let popup = false;
  const round = n => Number(n).toFixed(5);

  function ready(map, L, node) {
    map.on('load', e => {
      map.on('movestart', e => popup = false);  // .locate fires a 1st move event; we check moves after load only
      popup = true;
      externalLink(node, '.leaflet-control-attribution a');
    });
    map.on('moveend', e => {
      let pos = map.getCenter();  // update position back to main data
      console.log('moveend', pos);
      $latlng = `[${ round(pos.lat) }, ${ round(pos.lng) }]`;
    });
  }
</script>

<Popup>
  <Map {ready} locate={true} --grid-area="popup-content"/>
  {#if popup}
    <header transition:fly="{{ y: -500, duration: 500, delay: 1000 }}">
      <b>Tipp</b>: a térkép csúsztatásával pontosíthatod a helyszín pozícióját.
    </header>
  {/if}
  <mark><Icon icon="fa-solid:crosshairs"/></mark>
</Popup>

<style>
  header, mark {
    /* force them on top of map */
    grid-area: popup-content;
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
    pointer-events: none;
  }
</style>
