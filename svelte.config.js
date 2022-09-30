import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// paths: {base: '/lampa'},
	},
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: mdsvex({ extensions: ['.md'] }),
};

export default config;
