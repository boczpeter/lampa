<script>
  import 'leaflet/dist/leaflet.css';
  import { onMount } from "svelte";

  export let
    lat = 47.2496015,
    lng = 19.473029,
    zoom = 8,
    minZoom = 7,
    maxZoom = 18,
    maxNativeZoom = 19,
    ready = () => {};

  const tileUrl = "https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}",
    tileOptions = { minZoom: minZoom, maxZoom: maxZoom, maxNativeZoom: maxNativeZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' };
  let node;

  onMount(async () => {
    const L = await import('leaflet');
    const map = L.map(node);
    L.tileLayer(tileUrl, tileOptions).addTo(map);
    map.on('locationerror', e => map.setView([lat, lng], zoom));  // set to default view
    ready(map, L, node);
    return e => map.remove();
  });
</script>
<svelte:head><base target="_blank"></svelte:head>

<div bind:this={node}><slot/></div>

<style>
  div {
    flex: 1 0 auto; /* give div a valid height, required by Leaflet */
    grid-area: map; /* put into "map" area if available */
  }
</style>
