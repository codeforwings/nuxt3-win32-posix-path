/**
 * based on
 * https://globster.xyz/
 * yep... vite wont rollup. unless need output? or transpile?
 */
import {join} from "node:path/posix";
// import {join} from "node:path";

/**
 *
 * @type {string[]} - array of file paths Posix
 * https://github.com/mihneadb/node-directory-tree
 * https://gitlab.com/nfriend/tree-online
 * seems like the one... or have to use cygwin on windows...
 * might use
 */
export const DummyFiles = `
/myapp/readme.md
/myapp/config/staging.js
/myapp/config/production.js
/myapp/src/services/utils.js
/myapp/src/services/timezone.ts
/myapp/src/controllers/health.js
/myapp/src/controllers/user.module.ts
/myapp/assets/logo.png
/myapp/assets/logo_small.png
/myapp/assets/favicon.ico
`.split('\n').filter(Boolean).map(x=>x.trim());

/**
 * Testing vite build rollup... yep wont work
 * @param path
 * @param args
 * @return {string}
 */
export function buildNodePath(...args){
  return join(...args)
}

/**
 * With spaces!
 * @type {*[]}
 *
 * explorer is different too... no quotes. just raw
 * C:\Users\Public\temp spaces\a\b c\d
 */
export const DummyWindowsFiles = [
  "C:\\Users\\Public\\temp\\spaces\\some space",
  "C:\\Users\\Public\\temp\\spaces\\some space\\some file.txt",
]