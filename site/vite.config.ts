import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';


import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		global: 'globalThis'
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true
				})
			]
		}
	},
	build: {
		rollupOptions: {
			plugins: [rollupNodePolyFill()]
		}
	}
});
