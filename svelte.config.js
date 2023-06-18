import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			routes: {
			  include: ['/*'],
			  exclude: ['<all>', '/peer', '/lib/*']
			}
		  })
	}
};

export default config;
