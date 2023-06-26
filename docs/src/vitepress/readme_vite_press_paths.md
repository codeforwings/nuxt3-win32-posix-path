# Vite Press Paths Info
1. vite.config.js
2. docs/.vitepress/config.js
3. package.json


## Vite Config
::: code-group
```js {vite.config.js}

```
:::

## Vite Press Config

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