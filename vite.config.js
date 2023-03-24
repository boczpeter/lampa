import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg'

const config = {
  plugins: [
    sveltekit(),
    svg({svgoOptions: {plugins:[]}})  // make svgo not touch our files
  ],
  esbuild: { drop: ['console', 'debugger'] }  // remove console.log lines from prod
}

export default config;
