import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

/**
 * with vite dev vite-src
 * uses this vite.config.js by default
 * but which package.json?
 */
console.log('vite-src/vite.config.js');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    resolve: {
    //im assuming root package.json?
    alias: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      //https://nodejs.dev/en/api/v18/packages/#subpath-imports
      '##': fileURLToPath(new URL('../',import.meta.url)),//might want to try # or @ again
      '#vite-src': fileURLToPath(new URL('../',import.meta.url)),//might want to try # or @ again
      '#src': fileURLToPath(new URL('../src', import.meta.url)),
      '#docs': fileURLToPath(new URL('../docs', import.meta.url)),//not sure if vite also needs this but yea
    },
    extensions: [
      '.js',
      '.json',
      '.mjs',
      '.vue',
    ],
  },
})
