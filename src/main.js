import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'Lámpaszámlálás',
	}
});

export default app;