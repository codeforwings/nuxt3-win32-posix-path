/**
 * Should basically be the same as linux in general
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
import {describe, it} from 'mocha';
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
import process from 'node:process';
// import {win32ToWin32WSL2} from "##/dev/win-to-wsl/win32ToWin32WSL2.mjs";
import {win32ToWin32WSL2} from "##/src/win32ToWin32WSL/win32ToWin32WSL2.mjs"; //fixme check the import subpath in package.json in other branch
// writeToFile('WSLPassTests.jsonc',WSLPassTests);
/**
 * parameterized tests
 */
import {createMochaCliExeNew} from "##/lib/test-utils/mocha-cli-exec.mjs";
import {WSLPassTests} from "##/lib/test-utils/ConstPathTests.mjs";

function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe("linux Factory mjs",function() {
  if (process.platform === 'win32') return;
  const W2WB = "node";
  const assertNodeIndexMJS = createMochaCliExeNew(W2WB,['src/cli/index.mjs']);
  //for linux. needs to double slash to escape
  it('cli index.mjs normal',function(){
    // assertNodeIndexMJS(WSLPassTests[0][0].replace(/\\/g,"\\\\"),WSLPassTests[0][1])
    // assertNodeIndexMJS(WSLPassTests[0][0].replace(/\\/g,"\\\\"),WSLPassTests[0][1])
    assertNodeIndexMJS(WSLPassTests[0][0],WSLPassTests[0][1])
  })
});
/**
 * To integrate and move with other tests
 */
/**
 * should work for both wsl and linux
 */
describe("linux Factory",function() {
  if(process.platform === 'win32') return;
  const W2WB = "lib/bin_build/dist/index-linux";
  const assertW2Wb = createMochaCliExeNew(W2WB);
  // it('test process.platform', function () {
  //   assert.strictEqual(process.platform, 'linux');//for wsl
  // });
  for (let i = 0; i < WSLPassTests.length; i++) {
    const [inputWinPath, expectedMntPath, wslPassTestIndex] = WSLPassTests[i];
    it(`WSLPassTests MJS ${wslPassTestIndex}`, function () {
      // console.log(wslPassTestIndex,inputWinPath);
      const actual = win32ToWin32WSL2(inputWinPath);
      assert.strictEqual(actual,expectedMntPath);
    });
    /* scrapping ps1 / sh using exe for now */
    // it(`WSLPassTests ps1 ${wslPassTestIndex}`, function () {
    //   // console.log(wslPassTestIndex,inputWinPath);
    //   const output = spawnSync(inputWinPath);
    //   assert.strictEqual(actual,expectedMntPath);
    // });
    it(`WSLPassTests linux ${wslPassTestIndex}`, function(){
      //   // console.log(wslPassTestIndex,inputWinPath);
      if(/^['"]/.test(inputWinPath)){
        assertW2Wb(inputWinPath,expectedMntPath);

      }else{
        //linux is interesting... maybe i should put this inside of the index.js?
        assertW2Wb(inputWinPath.replace(/\\/g,"\\\\"),expectedMntPath);
      }
    });
  }
});