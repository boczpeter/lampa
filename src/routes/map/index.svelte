<script>
  import Map from '$lib/Map.svelte';
</script>

<section>
  <header>Header</header>
  <Map zoom=9 />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  header {
    text-align: center;
    padding: 1em;
  }
</style>
