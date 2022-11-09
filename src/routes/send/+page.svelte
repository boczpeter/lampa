<script>
	import Popup from '$lib/Popup.svelte';
	import { clipboard } from '$lib/stores';
  import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	// back to main page if called from browser nav/reload
	if (!$clipboard && browser)	goto(base || '/', { replaceState: true });
</script>

<Popup type='plain'>
	{$clipboard}
</Popup>
