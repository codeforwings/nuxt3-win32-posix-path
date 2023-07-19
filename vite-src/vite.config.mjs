// process.env.BASE_URL = '/nuxt3-win32-posix-path/';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

//might need dotenv for the it to work ... todo
/**
 * with vite dev vite-src
 * uses this vite.config.js by default
 * but which package.json?
 * im assuming if this file doesnt exist. it looks at the first cwd one
 */
console.log('vite-src/vite.config.js');
// console.log('vite-src/vite.config.js: ',import.meta.env.BASE_URL);//difference? crashed even as mjs
console.log('vite-src/vite.config.js: ',process.env.BASE_URL);//difference?
console.log('vite-src/vite.config.js: ',process.env.VITE_SOME_KEY);//difference?
// console.log('vite-src/vite.config.js: ',import.meta.env.MODE);//difference?
// console.log('vite-src/vite.config.js: ',import.meta.env.VITE_SOME_KEY);//difference?
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    fs:{
      allow: ['..']
    },
  },
  base:"/nuxt3-win32-posix-path/",
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
