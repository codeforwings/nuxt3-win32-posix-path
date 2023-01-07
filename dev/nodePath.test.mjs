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

/**
 * Test Class "C"
 */
function C(input,expected) {
  return {input,expected}
}
import {posix,win32} from 'node:path'

import {pathWin32ToPosix,pathPosixToWin32} from "../pathReplacement.mjs"

/**
 * mobaxterm is /drives/c or cd c:/
 * c:/ also works in git bash
 * so c:/ is good enough
 */
describe('nodePath.test.mjs', function(){
  /**
   * Tests can be reversed for testing
   * @type {{input, expected}[]}
   */
  const win32Tests = [
    C(
      // String.raw`C:\Users\Administrator\OneDrive\Documents\2022\someMD.md`,//doesnt work,1
      "C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md",
      'C:/Users/Jason/OneDrive/Documents/2022/someMD.md'
    ),
    /* directory */
    C(
      "C:\\Users\\Jason\\OneDrive\\Documents\\2022",
      "C:/Users/Jason/OneDrive/Documents/2022"
    ),
    C(
      "C:\\Users\\Jason\\OneDrive - Code for Wings\\rick and morty",
      "C:/Users/Jason/OneDrive - Code for Wings/rick and morty"
    )
  ];
  /* posix to win32 */


  it('Sep from posix and win32', function(){
    //assert.strictEqual(1,1);//require assert
    console.log(posix.sep);// /
    console.log(win32.sep);//\
    assert.strictEqual(posix.sep, '/');
    assert.strictEqual(win32.sep, '\\');
    // assert.strictEqual(win32.sep, String.raw`\\`[0]);//interesting doesnt work if it's only one slash
    assert.strictEqual(win32.sep, String.raw`\\`[0]);//interesting doesnt work if it's only one slash

  });
  it('Path tests from windows', function(){
    //assert.strictEqual(1,1);//require assert
    for (const test of win32Tests) {
      const {input,expected} = test;
      let out = pathWin32ToPosix(input);
      assert.strictEqual(out,expected)
    }
  });
  it('Path tests from posix', function(){
    //assert.strictEqual(1,1);//require assert
    for (const test of win32Tests) {
      const {input,expected} = test;
      let out = pathPosixToWin32(expected);
      assert.strictEqual(out,input);
    }
  });
  it('regexp with slash', function(){
    //assert.strictEqual(1,1);//require assert
    let reg = new RegExp('s','g');
    assert.deepEqual(reg,/s/g)
    // const reg = new RegExp('\\/','g');
    reg = new RegExp("\\\\",'g');
    assert.deepEqual(reg,/\\/g);

    reg = new RegExp(String.raw`\\`,'g');
    assert.deepEqual(reg,/\\/g);
  });
});
