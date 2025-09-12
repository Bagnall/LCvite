import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// https://vite.dev/config/

const logger = createLogger();
const loggerWarn = logger.warn;

logger.warn = (msg, options) => {
	// Ignore 'esbuild css minify thing is not a known CSS property'
	if (msg.includes('esbuild css minify') && msg.includes(' is not a known CSS property')) return;
	loggerWarn(msg, options);
};

export default defineConfig(({ command }) => ({
	assetsInclude: [
		'**/*.mp3',
		'**/*.jpg',
		'**/*.svg'
	],
	base: command === 'build' ? `./` : `/projects/richard/`,
	build: {
		assetsDir: "src",
		emptyOutDir: false,
		rollupOptions: {
			output: {
				assetFileNames: `src/[name].[ext]`,
				chunkFileNames: `src/[name].js`,
				entryFileNames: `src/[name].js`
			}
		}
	},
	customLogger: logger,
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					dest: './src/learningObjectConfigurations/fr', // destination inside dist/
					src: 'src/learningObjectConfigurations/fr/*.json' // path to your file
				},
				{
					dest: './src/learningObjectConfigurations/sp', // destination inside dist/
					src: 'src/learningObjectConfigurations/sp/*.json' // path to your file
				},
				{
					dest: './src', // destination inside dist/
					src: 'src/index*.json' // path to your file
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
	]
}));