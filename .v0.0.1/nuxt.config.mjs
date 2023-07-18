// https://nuxt.com/docs/api/configuration/nuxt-config
// const baseURL = process.env.NUXT_APP_BASE_URL || '/'
process.env.NUXT_APP_BASE_URL = '/nuxt3-win32-posix-path/'
//this works easiest way fixme
const baseURL = process.env.NUXT_APP_BASE_URL || '/nuxt3-win32-posix-path/'
export default defineNuxtConfig({
  ssr:false,
  // baseURL,//this breaks it? wth
  // env: {
  //   NUXT_APP_BASE_URL: process.env.NUXT_APP_BASE_URL || 'http://localhost:3000',
  // }

})
