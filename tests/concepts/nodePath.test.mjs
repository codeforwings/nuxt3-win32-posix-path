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

import {pathWin32ToPosix,pathPosixToWin32} from "##/src/pathReplacement.mjs"
import {posixTests, win32Tests} from "##/lib/nodePathTestExamples.mjs";
import {spawnSync} from "node:child_process";

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

const PathWin32ToPosixTests = [
  ["C:\\Users\\Public\\Documents","C:/Users/Public/Documents"],//maybe append with quotes instead?
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","C:/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","C:/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\\\Users\\\\Public\\\\Documents","C:/Users/Public/Documents"]
];
const ogLength = PathWin32ToPosixTests.length
for (let i = 0; i < ogLength; i++) {
  const row = PathWin32ToPosixTests[i];
  row[2] = i;
  PathWin32ToPosixTests.push([`'${row[0]}'`,row[1],`${i}1`]);//append with single quotes
  PathWin32ToPosixTests.push([`"${row[0]}"`,row[1],`${i}2`]);//append with double quotes

}
describe('PathWin32ToPosixTests', function(){
  for (let i = 0; i < PathWin32ToPosixTests.length; i++) {
  // for (let i = 0; i < 1; i++) { //run only 1
    const [inputWinPath, expectedMntPath, win32ToPosixIndex] = PathWin32ToPosixTests[i];
    it(`PathWin32ToPosixTests MJS ${win32ToPosixIndex}`, function () {
      // console.log(wslPassTestIndex,inputWinPath);
      const actual = pathWin32ToPosix(inputWinPath);
      assert.strictEqual(actual,expectedMntPath);
    });
    it(`PathWin32ToPosixTests ps1 ${win32ToPosixIndex}`, function () {
      // console.log(wslPassTestIndex,inputWinPath);
      const output = spawnSync(`pwsh.exe -file lib/test-utils/pwsh-test-mocha.ps1`,[`"${inputWinPath}"`],{shell:true});
      // const output = spawnSync(`pwsh.exe -Command write-host ${inputWinPath}`,[],{shell:true});
      if(output.status !== 0){
        console.log(output.stdout.toString())
        console.error(output.stderr.toString())
        console.error(output.error,output.status)
        throw output.error
      }
      const actual = output.stdout.toString()

      assert.strictEqual(actual,expectedMntPath);
    });
  }
});