<script>
  import 'leaflet/dist/leaflet.css';
  import { onMount } from "svelte";

  export let
    lat = 47.25,
    lng = 19.5,
    zoom = 8,
    minZoom = 7,
    maxZoom = 18,
    maxNativeZoom = 19,
    ready = () => {};

  let node;

  onMount(async () => {
    const L = await import('leaflet');
    const map = L.map(node);
    L.tileLayer('https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}', { minZoom:minZoom, maxZoom:maxZoom, maxNativeZoom:maxNativeZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    map.on('locationerror', e => map.setView([lat, lng], zoom));  // set to default view
    ready(map, L, node);
    return e => map.remove();
  });
</script>

<div bind:this={node}><slot/></div>

<style>
  div {
    flex: 1 0 auto; /* give div a valid height, required by Leaflet */
    grid-area: map; /* put into "map" area if available */
  }
</style>
