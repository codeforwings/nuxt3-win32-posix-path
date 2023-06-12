import { defineConfig } from 'vitepress'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'
// /** @type {import('vitepress')} */
// let sidebar;

/**
 * sidebar
 * https://github.com/JonathanSchndr/vitepress-plugin-auto-sidebar
 * best combination seems to be:
 * contentRoot: '/'
 * contentDirs: ['docs']
 * but has .vitepress
 *
 * but now i added src and modifed config
 *
 * might just write my own sidebar plugin
 * https://github.com/luciozhang/vitepress-plugin-autobar
 * this might be better. ya pl;ugin broken i think
 */
const sidebarPlugin = getSidebar({
  // contentRoot: '/',
  contentRoot: 'docs/',
  // contentRoot: '/docs/src',
  // contentRoot: 'docs/',
  /* content dir */
  // contentDirs: ['docs/src'],
  // contentDirs: ['docs/src'],
  contentDirs: ['src'],
  // contentDirs:['.'],//nope
  // contentDirs:['.src/'],//nope
  // collapsible: false,//this one isnt
  // collapsed: false,//i think only this one is legit
  // collapsed: null,//i think only this one is legit
});
// console.dir(sidebarPlugin);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  title: "Win32 Posix Path Tutorial",
  description: "Cheatsheet, utils, tutorial for OS Paths",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // plugin for this?
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    // sidebar: sidebarPlugin,
    sidebar: [

      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Readme Vite Press', link: '/readme_vite_press' },
        ]
      },
      ...sidebarPlugin,//defn need some plugin
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
