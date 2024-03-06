import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */

const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

	kit: {
		adapter: adapter({
      precompress: true // generate .gz and .br files
    }),
	},

  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
};

export default config;
