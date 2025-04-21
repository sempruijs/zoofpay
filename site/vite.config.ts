import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
	plugins: [sveltekit()],
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
