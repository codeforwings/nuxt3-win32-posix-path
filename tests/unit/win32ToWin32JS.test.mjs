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
import {replaceProgramFiles, win32JSToWin32, win32ToWin32JS} from "../../src/win32ToWin32JS.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
describe('win32ToWin32JS.test.mjs', function(){
  it('win32ToWin32JS.mjs', function(){
    //assert.strictEqual(1,1);//require assert
    const input = 'C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md'
    let out = win32ToWin32JS(input)
    assert.strictEqual(out,'C:\\\\Users\\\\Jason\\\\OneDrive\\\\Documents\\\\2022\\\\someMD.md');
    // console.log(out);
  });
  it('win32ToWin32JS.mjs double', function(){
    //assert.strictEqual(1,1);//require assert
    const input = 'C:\\\\Users\\\\Jason\\\\OneDrive\\\\Documents\\\\2022\\\\someMD.md'
    let out = win32ToWin32JS(input)
    assert.strictEqual(out,'C:\\\\Users\\\\Jason\\\\OneDrive\\\\Documents\\\\2022\\\\someMD.md');
    // console.log(out);
  });
  //todo might need to updaet this
  it('win32ToWin32JS with spaces', function(){
    //assert.strictEqual(1,1);//require assert
    const input = 'C:\\Users\\Jason\\OneDrive - Code for Wings\\rick and morty'
    let out = win32ToWin32JS(input)//hmm i think there were quotes though
    assert.strictEqual(out,'C:\\\\Users\\\\Jason\\\\OneDrive - Code for Wings\\\\rick and morty');
    // console.log(out);
  });

});

/**
 * pnpm add -d csvtojson
 */
import csv from 'csvtojson'
describe('tests/fixtures/win32JSToWin32.csv', function(){
  let jsonArray;
  before(async function(){
    const csvFilePath = 'tests/fixtures/win32JSToWin32.csv';

    jsonArray = await csv().fromFile(csvFilePath);
  });
  it("get file", async function(){
    const csvFilePath = 'tests/fixtures/win32JSToWin32.csv';

    const jsonArray = await csv().fromFile(csvFilePath);
    // console.log(jsonArray);
    writeToFile('win32JSToWin32.json',jsonArray);

    assert.ok(Array.isArray(jsonArray),'jsonArray is not an array');

  });
  it("hardcoded \\ ", async function(){
    const actual = "C:\\\\Users\\\\Public\\\\Documents".replace(/\\\\/g,'/');
    assert.strictEqual(actual,"C:/Users/Public/Documents");
  });
  //fixme
  it("win32JSToWin32", async function(){
    const csvFilePath = 'tests/fixtures/win32JSToWin32.csv';

    const jsonArray = await csv().fromFile(csvFilePath);
    // console.log(jsonArray);
    writeToFile('win32JSToWin32.json',jsonArray);

    assert.ok(Array.isArray(jsonArray),'jsonArray is not an array');
    jsonArray.forEach((row)=>{
      const {jsPath,winPathSlash,sep} = row;
      const input = jsPath;
      const expected = winPathSlash;
      const actual = win32JSToWin32(input,sep);
      assert.strictEqual(actual,expected);
    })
  })
});

describe('replaceProgramFiles', function(){
  it("replaceProgramFiles program files", async function(){
    assert.strictEqual(replaceProgramFiles('C:\\Program Files\\nodejs\\node.exe'),
      'C:\\progra~1\\nodejs\\node.exe');
  })
  it("replaceProgramFiles program files x86", async function(){
    assert.strictEqual(replaceProgramFiles('C:\\Program Files\\nodejs\\node.exe'),
      'C:\\progra~1\\nodejs\\node.exe');
  })
  it("replaceProgramFiles program data", async function(){
    assert.strictEqual(replaceProgramFiles('C:\\Program Data\\ssh'),
      'C:\\progra~3\\ssh');
  })
});
