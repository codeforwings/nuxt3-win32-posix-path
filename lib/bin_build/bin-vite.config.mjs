/**
 * Bin builder for vite config
 */
// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import {rootFileUrl, viteBaseConfig} from "##/vite.config.mjs";
// import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  ...viteBaseConfig,
  build: {
    //https://vitejs.dev/guide/build.html#library-mode
    outDir: fileURLToPath(new URL('./lib/bin_build/.output/', rootFileUrl)),
    lib: {
      name: 'nuxt3-win32-posix-path',
      formats: ['es', 'cjs'],//('es' | 'cjs' | 'umd' | 'iife')
      entry: [ //"entry" can be a dictionary or array of multiple entry points
        fileURLToPath(new URL('./lib/bin_build/index.mjs', rootFileUrl)),
      ]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['puppeteer',"puppeteer-core","node:path/posix","node*"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue',//not sure what this means
        // },
      },
    },
  },

})
