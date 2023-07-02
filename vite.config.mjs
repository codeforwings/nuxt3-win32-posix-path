/**
 * Apparently this messes with the build....
 */
// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
// import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  resolve: {
    alias: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      //https://nodejs.dev/en/api/v18/packages/#subpath-imports
      '##': fileURLToPath(new URL('./',import.meta.url)),//might want to try # or @ again
      '#src': fileURLToPath(new URL('./src', import.meta.url)),
      '#docs': fileURLToPath(new URL('./docs', import.meta.url)),//not sure if vite also needs this but yea
    },
    extensions: [
      '.js',
      '.json',
      '.mjs',
      '.vue',
    ],
  },
  /**
   * For experimentation of puppeteer
   */
  build: {
          //https://vitejs.dev/guide/build.html#library-mode
    outDir: fileURLToPath(new URL('./lib/dist/', import.meta.url)),
    lib: {
      name: 'nuxt3-win32-posix-path',
      // formats: ['es', 'cjs','umd'],//('es' | 'cjs' | 'umd' | 'iife')
      formats: ['es', 'cjs'],//('es' | 'cjs' | 'umd' | 'iife')
      //i lost my jsdocs though... weird
      entry: [ //"entry" can be a dictionary or array of multiple entry points
        fileURLToPath(new URL('./src/index.mjs', import.meta.url)),
        fileURLToPath(new URL('./src/cli/index.mjs', import.meta.url)),
        // fileURLToPath(new URL('./dev/node-fs-utils-dev/create-dummy-files.mjs', import.meta.url)),
        // fileURLToPath(new URL('./src/win32ToWin32WSL2.mjs', import.meta.url)),
        // fileURLToPath(new URL('./src/import-material-theme-pup.mjs', import.meta.url)),
        // resolve('src/import-theme-chrome-pup.mjs'),
        // Ok... cannot use vite to roll it up... just doesnt work
        // resolve('##/src/generate-pupp-json/generate-pupp-json.mjs'),//fixme, this path didnt work?
        // fileURLToPath(new URL('./src/generate-pupp-json/generate-pupp-json.mjs', import.meta.url)),
        // resolve('##/src/index.mjs'),
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
