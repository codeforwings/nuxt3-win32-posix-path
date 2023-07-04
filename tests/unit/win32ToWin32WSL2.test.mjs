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
// import {win32ToWin32WSL2} from "##/dev/win-to-wsl/win32ToWin32WSL2.mjs";
import {win32ToWin32Slash, win32ToWin32WSL2} from "##/src/win32ToWin32WSL/win32ToWin32WSL2.mjs";//fixme check the import subpath in package.json in other branch
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
  it("pwsh spaces", function(){
    let input,expected,actual;
    input = "C:\\Users\\Public\\temp spaces\\a\\b c\\d";//apparently pwsh can cd into this
    assert.ok(fs.existsSync(input));
    expected = "c:/Users/Public/temp\ spaces/a/b\ c/d";//will work with quotes
    assert.ok(fs.existsSync(expected));//works with fs, but not with pwsh
    // actual = win32ToWin32Slash(input);
    // assert.strictEqual(actual,expected);

    // expected = "'c:/Users/Public/temp spaces/a/b c/d'";//single quotes, dont escape
    expected = "c:/Users/Public/temp` spaces/a/b` c/d";//backtick escape added
    //double quotes need escape. but pwsh is backtick `
    actual = win32ToWin32Slash(input);
    // assert.ok(fs.existsSync(expected));
    assert.strictEqual(actual,expected);


  });
  /* todo add more unit tests and try quotes and spaces etc.*/
  //todo write down what works...
  //maybe later use try ones with spaces, for not now.
  // because im reallocating and renaming / files and folders with spaces

});


/**
 * wsl param tests
 *
 */
export const WSLPassTests = [
  ["C:\\Users\\Public\\Documents","/mnt/c/Users/Public/Documents"],//maybe append with quotes instead?
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\\\Users\\\\Public\\\\Documents","/mnt/c/Users/Public/Documents"],
  //todo look into thje backtick
  // ["C:\\Users\\Public\\temp` spaces\\a\\b` c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
]
//should work with changing the length of the array
const ogLength = WSLPassTests.length
for (let i = 0; i < ogLength; i++) {
  const row = WSLPassTests[i];
  row[2] = i;
  WSLPassTests.push([`'${row[0]}'`,row[1],`${i}1`]);//append with single quotes
  WSLPassTests.push([`"${row[0]}"`,row[1],`${i}2`]);//append with double quotes

}
// writeToFile('WSLPassTests.jsonc',WSLPassTests);
/**
 * parameterized tests
 */
import {spawnSync} from "node:child_process";
import {createMochaCliExe} from "##/lib/test-utils/mocha-cli-exec.mjs";

describe('WSLPassTests', function(){
  /** @type {string|'Win32ToWin32WSL2BinaryPath'} */
  const W2WB = "lib/bin_build/dist/index-win.exe";
  const assertW2Wb = createMochaCliExe(W2WB);
  /* raw */
  it('WSLPassTests mocha exe', function(){
    const output = spawnSync(
      // `"${W2WB}" [C:\\` //cmd needs to double quote
      `"${W2WB}"`,[WSLPassTests[0][0]],{shell:true}
    );
    if(output.status !== 0){
      console.error(output);
      console.log(output.stdout.toString())
      console.error(output.stderr.toString())
      throw new Error("status not 0");
    }
    const actual = output.stdout.toString().trim();
    assert.strictEqual(actual,WSLPassTests[0][1]);
  });
  /* wrapper note reversed */
  it('WSLPassTests assertW2Wb', function(){
    assertW2Wb(WSLPassTests[0][1],WSLPassTests[0][0]);
  });
    /* wrapper note reversed */
  it('WSLPassTests assertW2Wb - spaces', function(){
    assertW2Wb(WSLPassTests[1][1],WSLPassTests[1][0]);
  });
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
    it(`WSLPassTests exe ${wslPassTestIndex}`, function(){
      //   // console.log(wslPassTestIndex,inputWinPath);
      assertW2Wb(expectedMntPath,[inputWinPath]);
    });
  }
});