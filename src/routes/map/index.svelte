<script>
  import 'leaflet/dist/leaflet.css';
  import { onMount } from "svelte";
  const tileUrl = "https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}",
    tileView = [[47.2496015, 19.473029], 8],
    tileOptions = {
      minZoom: 7,
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" rel="external" target="_blank">OpenStreetMap</a> contributors',
  };
	// import Popup from '$lib/Popup.svelte';
  onMount(async () => {
    const L = await import('leaflet');
    const map = L.map('map').setView(...tileView);
    L.tileLayer(tileUrl, tileOptions).addTo(map);
  });
</script>

<section id="map"></section>

<style>
  #map {
    height: 100vh;
  }
</style>
