import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	define: {
		global: 'window',
		process: { env: {} }
	}
};

export default config;
