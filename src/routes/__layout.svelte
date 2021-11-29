<script>
	// import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<header>
</header>

<slot />

<footer>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
		}
	}
</style>
