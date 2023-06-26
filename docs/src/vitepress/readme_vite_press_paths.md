# Vite Press Paths Info
1. vite.config.js
2. docs/.vitepress/config.js
3. package.json


## Vite Config
::: code-group
```js {vite.config.js}
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  define: { 'process.env': {} },
  resolve: {
    alias: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      //https://nodejs.dev/en/api/v18/packages/#subpath-imports
      '##': fileURLToPath(new URL('./', import.meta.url)),//might want to try # or @ again
      '#src': fileURLToPath(new URL('./src', import.meta.url)),
      '#docs': fileURLToPath(new URL('./docs', import.meta.url)),//not sure if vite also needs this but yea
    },
  }});
```

:::

## Vite Press Config
::: code-group
```js {.vitepress/config.js}
import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  //https://vitepress.dev/reference/site-config#base
  base: "/REPO_NAME_HERE/",//should probably just use env
  srcDir: './src',//relative to the package.json vitepress dev <dir>
  lang: 'en-ca',
  //-- etc
  //--
  socialLinks: [
    { icon: 'github', link: 'https://github.com/codeforwings/material-design-3-import-export-ext' }
  ],
  /** @type {import('vitepress/MarkdownOptions')} */
  markdown:{
    //https://vitepress.dev/reference/site-config#markdown
    lineNumbers: true,
    space_size: 2,//not sure if this works

  }
});
```
```tree
File Tree here
```
:::
## Package.json
* [Node Sub Imports](https://nodejs.dev/en/api/v18/packages/#subpath-imports)

```jsonc {package.json}
  "imports": {
    "##/*": {
      "default": "./*"
    },
    "#src/*": {
      "default": "./src/*"
    },
    "#docs/*": {
      "default": "./docs/*"
    }
  }
```
::: details
* tsconfig doesnt need to be overridden...
*
:::

## Cheatsheet Vite
* add tree
* inside Markdown link. has to use encodeURIComponent
* @ means docs/src
* using #docs/ works (package.json)
```md
docs/src
docs/src/public/

<<< @/public/some_folder/some_file.json


```