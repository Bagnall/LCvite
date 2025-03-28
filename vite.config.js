import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
	assetsInclude: [
		'**/*.mp3',
		'**/*.jpg',
		'**/*.svg'
	],
	base: '/projects/richard',
	build: {
		assetsDir: "src",
		rollupOptions: {
			output: {
				assetFileNames: `src/[name].[ext]`,
				chunkFileNames: `src/[name].js`,
				entryFileNames: `src/[name].js`
			}
		}
	},
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					dest: './src', // destination inside dist/
					src: 'src/config*.json' // path to your file
				},
				{
					dest: '/sounds',
					src: './public/sounds'
				},
				{
					dest: '/images',
					src: './public/images'
				}
			]
		})
	],
});