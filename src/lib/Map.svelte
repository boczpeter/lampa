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
    maximumAge = 60 * 60 * 1000, // 1 hour
    locate = false,
    ready = () => {};

  let node;

  onMount(async () => {
    const L = await import('leaflet');
    const map = L.map(node);
    L.tileLayer('https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}', { minZoom:minZoom, maxZoom:maxZoom, maxNativeZoom:maxNativeZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    ready(map, L, node);
    if (locate) {
      map.on('locationerror', e => map.setView([lat, lng], zoom));  // set to default view
      map.locate({setView:true, maxZoom:maxZoom, maximumAge:maximumAge});
    }
    return e => map.remove();
  });
</script>

<div bind:this={node}><slot/></div>

<style>
  div {
    flex: 1 0 auto; /* give div a valid height if flex-item, required by Leaflet */
    grid-area: var(--grid-area, map); /* put into specific grid area if available */
    border-radius: var(--radius);
  }
</style>
