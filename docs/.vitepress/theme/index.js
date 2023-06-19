// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import HelloWorld from "./custom/hello-world.vue";
import './style.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'hello-world': () => h(HelloWorld)


    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    //their docs.. man
    //https://vitepress.dev/guide/extending-default-theme#registering-global-components
        app.component('HelloWorld', HelloWorld)

  }
}
