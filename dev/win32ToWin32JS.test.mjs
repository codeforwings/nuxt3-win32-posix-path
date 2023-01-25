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
import {win32ToWin32JS} from "./win32ToWin32JS.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe('win32ToWin32JS.test.mjs', function(){
  it('win32ToWin32JS.mjs', function(){
    //assert.strictEqual(1,1);//require assert
    const input = 'C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md'
    let out = win32ToWin32JS(input)
    console.log(out);
  });
  //todo might need to updaet this
  it('win32ToWin32JS with spaces', function(){
    //assert.strictEqual(1,1);//require assert
    const input = 'C:\\Users\\Jason\\OneDrive - Code for Wings\\rick and morty'
    let out = win32ToWin32JS(input)
    console.log(out);
  });

});
