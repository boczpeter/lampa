<script>
	import { latlng, zoom, externalLink } from '$lib/stores.js';
	import { fly } from 'svelte/transition';
  import Map   from './Map.svelte';
	import Popup from '$lib/Popup.svelte';
	import Icon  from '$lib/Icon.svelte';

  let popup = false;

  function ready(map, L, node) {
    map.on('load', e => {
      map.on('movestart', e => popup = false)  // .locate fires a 1st move event; we check moves after load only
      popup = true
      externalLink(node, '.leaflet-control-attribution a')
    });
    map.on('moveend', e => $latlng = map.getCenter())  // update position back to main data
    map.on('zoomend', e => $zoom   = map.getZoom())
  }
</script>

<Popup type=map>
  <Map {ready} locate center={$latlng} zoom={$zoom}/>
  {#if popup}
    <header transition:fly="{{ y: -500, duration: 500, delay: 1000 }}">
      <b>Tipp</b>: a térkép csúsztatásával pontosíthatod a helyszín pozícióját.
    </header>
  {/if}
  <mark><Icon icon=crosshairs/></mark>
</Popup>

<style>
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
    display: flex;
    font-size: 2rem;
    place-self: center;
    pointer-events: none;
  }
</style>
