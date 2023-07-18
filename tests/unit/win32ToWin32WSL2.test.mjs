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
import {CygwinPassTests, WSLPassTests} from "##/lib/test-utils/ConstPathTests.mjs";
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
// import {win32ToWin32WSL2} from "##/dev/win-to-wsl/win32ToWin32WSL2.mjs";
import {win32ToCygwin, win32ToWin32Slash, win32ToWin32WSL2} from "##/src/win32ToWin32WSL/win32ToWin32WSL2.mjs";//fixme check the import subpath in package.json in other branch
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 * To integrate and move with other tests
 */
//todo win32ToMntPath
describe('win32ToWin32WSL2.test.mjs', function(){
  it('wsl', function(){
    //assert.strictEqual(1,1);//require assert
    const escapedInput = "C:\\Users\\Public\\Documents";
    const expectedOutput = "/mnt/c/Users/Public/Documents";//dont ask me why the c is lowercase
    const expectedError = "/mnt/C/Users/Public/Documents";//case sensitive for WSL
    let actual;
    actual = win32ToWin32WSL2(escapedInput);
    assert.strictEqual(actual,expectedOutput);
    assert.notStrictEqual(actual,expectedError);//obv will pass like 100% of the time
    //maybe add subprocess to try with wsl... but that requires setup etc. manually verified
    //may not easily work with github actions anyway.
  });

  //todo later.
  it('win32ToWin32Slash cmd / powershell', function(){
    //assert.strictEqual(1,1);//require assert
    const escapedInput = "C:\\Users\\Public\\Documents";
    const expectedOutput = "c:/Users/Public/Documents";//case-insensitive, but reusing wsl function
    const expectedError = "C:/Users/Public/Documents";//case-insensitive for both windows and cygwin
    let actual
    actual = win32ToWin32Slash(escapedInput);
    assert.strictEqual(actual,expectedOutput);
    assert.notStrictEqual(actual,expectedError);//obv will pass like 100% of the time
    //maybe add subprocess to try with cmd and powershell

  });
  it('win32ToWin32Slash cmd double backslash \\\\ powershell', function(){
    const escapedInput = "C:\\Users\\Public\\Documents";
    const expectedOutput = "c:/Users/Public/Documents";//case-insensitive, but reusing wsl function
    let actual
    actual = win32ToWin32Slash(escapedInput);
    assert.strictEqual(actual,expectedOutput);
  });
  /* try with network mount add \\ path to check real quick */
  // it("pwsh spaces", function(){
  //   let input,expected,actual;
  //   input = "C:\\Users\\Public\\temp spaces\\a\\b c\\d";//apparently pwsh can cd into this
  //   assert.ok(fs.existsSync(input));
  //   expected = "c:/Users/Public/temp\ spaces/a/b\ c/d";//will work with quotes
  //   assert.ok(fs.existsSync(expected));//works with fs, but not with pwsh
  //   // actual = win32ToWin32Slash(input);
  //   // assert.strictEqual(actual,expected);
  //
  //   // expected = "'c:/Users/Public/temp spaces/a/b c/d'";//single quotes, dont escape
  //   expected = "c:/Users/Public/temp` spaces/a/b` c/d";//backtick escape added
  //   //double quotes need escape. but pwsh is backtick `
  //   actual = win32ToWin32Slash(input);
  //   // assert.ok(fs.existsSync(expected));
  //   assert.strictEqual(actual,expected);
  //
  //
  // });
  /* todo add more unit tests and try quotes and spaces etc.*/
  //todo write down what works...
  //maybe later use try ones with spaces, for not now.
  // because im reallocating and renaming / files and folders with spaces

});


/**
 * wsl param tests
 *
 */

// writeToFile('WSLPassTests.jsonc',WSLPassTests);
/**
 * parameterized tests
 */

describe('WSLPassTests', function(){
  /* if windows */
  // if(process.platform !== 'win32'){
  //   return;
  // }
 /**/
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

  }
});

describe('CygwinPassTests', function(){
  /* if windows */
  // if(process.platform !== 'win32'){
  //   return;
  // }
 /**/
  for (let i = 0; i < CygwinPassTests.length; i++) {
    const [inputWinPath, expectedMntPath, wslPassTestIndex] = CygwinPassTests[i];
    it(`CygwinPassTests MJS ${wslPassTestIndex}`, function () {
      // console.log(wslPassTestIndex,inputWinPath);
      const actual = win32ToCygwin(inputWinPath);
      assert.strictEqual(actual,expectedMntPath);
    });
  }
});
