import resolve from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import svelte from 'rollup-plugin-svelte';
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

import { mdsvex } from "mdsvex";

import path from "path";

const projectRootDir = path.resolve(__dirname);

const customResolver = resolve({
  extensions: [ "js", "ts", "svx" ]
});

const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
      dev: !production,
      extensions: [ ".svelte", ".svx" ],
      preprocess: [
        sveltePreprocess(),
        mdsvex({
          layout: "./src/layout/LayoutArticle.svelte"
        })
      ],
			// we"ll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write("public/build/bundle.css");
			}
    }),
    
    alias({
      extensions: [ "js", "ts", "svx" ],
      entries: [
        { find: "@src", replacement: path.resolve(projectRootDir, 'src') },
        { find: "@layout", replacement: path.resolve(projectRootDir, 'src/layout') },
        { find: "@public", replacement: path.resolve(projectRootDir, 'public') },
        { find: "@app", replacement: path.resolve(projectRootDir, 'src/app') },
        { find: "@components", replacement: path.resolve(projectRootDir, 'src/components') },
        { find: "@util", replacement: path.resolve(projectRootDir, 'src/util') },
        { find: "@stores", replacement: path.resolve(projectRootDir, 'src/stores') },
        { find: "@routes", replacement: path.resolve(projectRootDir, 'src/routes') },
        { find: "@types", replacement: path.resolve(projectRootDir, 'src/types') }
      ],
      customResolver
    }),

		// If you have external dependencies installed from
		// npm, you"ll most likely need these plugins. In
		// some cases you"ll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"]
    }),
    
    commonjs(),
    
    typescript({ sourceMap: !production }), 

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		// If we"re building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}
