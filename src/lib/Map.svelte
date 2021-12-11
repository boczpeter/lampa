<script>
  import 'leaflet/dist/leaflet.css';
  import { onMount } from "svelte";

  export let
    lat = 47.2496015,
    lng = 19.473029,
    zoom = 8,
    minZoom = 7,
    maxZoom = 20,
    maxNativeZoom = 19;

  const tileUrl = "https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}",
    tileOptions = { minZoom: minZoom, maxZoom: maxZoom, maxNativeZoom: maxNativeZoom,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' };
  let node;

  onMount(async () => {
    const L = await import('leaflet');
    const map = L.map(node).setView([lat, lng], zoom);
    L.tileLayer(tileUrl, tileOptions).addTo(map);
  });
</script>
<svelte:head><base target="_blank"></svelte:head>

<div bind:this={node}></div>

<style>
  div {
    height: 100%;
  }
  :global(.leaflet-control-attribution a::after) {
    content: " ↗";  /* thin non-break space included in content */
  }
</style>
