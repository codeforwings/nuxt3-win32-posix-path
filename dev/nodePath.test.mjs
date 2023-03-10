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

import {posix,win32,sep} from 'node:path'

import {pathWin32ToPosix,pathPosixToWin32} from "../pathReplacement.mjs"
import {posixTests, win32Tests} from "./nodePathTestExamples.mjs";

/**
 * mobaxterm is /drives/c or cd c:/
 * c:/ also works in git bash
 * so c:/ is good enough
 */
describe('nodePath.test.mjs', function(){



  it('Sep from posix and win32', function(){
    //assert.strictEqual(1,1);//require assert
    // console.log(posix.sep);// /
    // console.log(win32.sep);//\
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
    for (const test of posixTests) {
      const {input,expected} = test;
      let out = pathPosixToWin32(input);
      assert.strictEqual(out,expected);
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
  it('node path sep from windows machine',function(){
    assert.strictEqual(sep,"\\")
  })
});
