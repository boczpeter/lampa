import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg'

const config = {
  plugins: [
    sveltekit(),
    svg({svgoOptions: {plugins:[]}})
  ],
}

export default config;
