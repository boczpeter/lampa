import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'Lámpaszámlálás',
		bgcolor: '#333',
	}
});

export default app;