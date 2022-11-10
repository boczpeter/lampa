<script>
  import { onMount } from 'svelte';
  import 'leaflet/dist/leaflet.css';

  export let
    center = { lat: 47.25, lng: 19.5 },
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
      map.on('locationerror', e => map.setView(center, zoom));  // set to default view
      map.locate({setView:true, maximumAge:maximumAge});
    } else {
      map.setView(center, zoom);
    }
    return e => map.remove();
  });
</script>

<article bind:this={node} role=application><slot/></article>

<style>
  article {
    flex: 1 0 auto; /* give div a valid height if flex-item, required by Leaflet */
    grid-area: var(--grid-area, map); /* put into specific grid area if available */
    border-radius: var(--radius);
    overscroll-behavior: none;
    min-width: 300px;
    min-height: 300px;
    max-height: 100%;
    background: transparent;
  }
</style>
