/**
 * Also in material design 3.. git
 */

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
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
import {relative,resolve,join} from "node:path/posix";
import {fileURLToPath} from "url";

describe('vite-press-path-utils.test.mjs', function(){
  let viteConfigFile;
  /** @type {'docs/.vitepress' | string} - .vitepress config */
  viteConfigFile = 'docs/.vitepress';

  const testMatrix = [
    //"" is cwd
    [resolve(""),"../.."],//,cwd, new URL('./',import.meta.url).pathname???
    [resolve("./src"),"../../src"],//cwd/src, cant be ../src
    [resolve("src"),"../../src"],//cwd/src, same as above. left is okay to repeat
    [resolve("./docs/src"),"../src"],
    [resolve("./docs"),"../"],
  ]
  it('first try', function(){
    for (let i = 0; i < testMatrix.length; i++) {
      const [expectedPath,inputRelativePathParam] = testMatrix[i];
      // destDirCWD = '';
      // const out = relative(inputRelativePathParam,viteConfigFile);
      /** Resolve docs/.vitepress with relative path to destination dir */
      const out = resolve(viteConfigFile,inputRelativePathParam);//reverse
      // const out = resolve('./',viteConfigFile);
      // console.log(import.meta.url);
      // const tmp = fileURLToPath(new URL('../..', import.meta.url))
      assert.strictEqual(out,expectedPath);
    }


    //assert.strictEqual(1,1);//require assert
  });

});
