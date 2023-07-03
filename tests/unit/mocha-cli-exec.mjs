/**
yarn add mocha -D

package.json
  "imports": {
    "##/*": {
      "default": "./*"
    },
  },
  "type": "module",

  jsconfig.json
  {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "##/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}



*/
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'node:assert';
import { describe, it} from 'mocha';
/*
1.
yarn add mocha @babel/polyfill @babel/register @babel/preset-env babel-plugin-module-resolver --dev
yarn add @babel/core --dev
2.
-r @babel/register -r babel-plugin-module-resolver

3.
.babelrc
{

  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash",

        "~": "./"
      }
    }]
  ]

}
test specific timeout
this.timeout(500);//500ms
*/
/**
 * Should put this somewhere safe
 * todo filepath needs to be initialized as well...
 * @param fileName .json
 * @param data will automatically be changed
 */
import fs from 'node:fs';
import {createMochaCliExe} from "##/lib/test-utils/mocha-cli-exec.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe('tests/unit/mocha-cli-exec.mjs', function(){
  const assertW2bMJS = createMochaCliExe("node.exe")
  const pathToJS = "lib/bin_build/index.mjs"
  it('Check factory function - createMochaCliExe', function(){
    //assert.strictEqual(1,1);//require assert
    const fn = createMochaCliExe()
    console.log(fn.toString());
  });
  it('check index.mjs without spaces', function(){
    assertW2bMJS("/mnt/c/Users/Public/Documents",pathToJS,"c:/Users/Public/Documents");
  });
  it('check index.mjs with spaces', function(){
    assertW2bMJS("/mnt/c/Users/Public/Docu\\ ments",pathToJS,"c:/Users/Public/Docu ments");
  });
});
