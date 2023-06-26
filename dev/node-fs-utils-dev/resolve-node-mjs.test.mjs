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
  const filePath = `temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 * docs/src/dev/resolve-node-mjs.md
 */
import {dirname, resolve,join,normalize,relative} from "node:path"
import {fileURLToPath} from "node:url"

/* My Live templates */
const __dirname = dirname(fileURLToPath(import.meta.url)); //Folder of current file (from file://url)
//import from url.fileURLToPath and path.dirname
const __filename = fileURLToPath(import.meta.url); //file (from file://url)

//interesting works, but experimental
// import * as packages from '##/package.json'  assert {
//     type: 'json',
//     }
import os from "node:os";

/**
 * const currentDirectory = process.cwd();
 * console.log(currentDirectory);
 *
 * check for package.json
 */
describe('fileUrlToPath vs resolve windows', function(){
  //with working directory as project root

  /**
   * Doesnt seem to resolve anymore... interesting
   *
   * exports is for entry points, perhaps for bundlejs?
   *
   * imports or sub-paths only work for import and require.
   */
  it('try node:path - nope',function(){
    //assert.strictEqual(1,1);//require assert
    if(os.platform() !== 'win32'){
      return true;
    }
    let out
    let winExpectedButNotWant = "#src\\index.mjs";//actually wrong
    //resolves on windows changes my path to \\
    out = resolve("#src/index.mjs");
    assert.ok(out.includes("#src"));//so wrong

    out = normalize("#src/index.mjs");//blank???
    assert.strictEqual(out,winExpectedButNotWant);


    out = join("#src/index.mjs");//blank???
    assert.strictEqual(out,winExpectedButNotWant);
    // assert.ok(!out);//""

    // console.log(packages);
  });
  /**
   * C:\Users\Public\Documents
   */
  it('make fake file with spaces',function() {
    //assert.strictEqual(1,1);//require assert
    if (os.platform() !== 'win32') {
      return true;
    }
    let out
    fs.mkdirSync('temp/resolve\ node-mjs.test.mjs', {recursive: true,force:true});
    fs.writeFileSync('temp/resolve\ node-mjs.test.mjs/some file.txt', "some file.txt\n");
    out = fs.readFileSync('C:\\Users\\Jason\\WebstormProjects\\nuxt3-win32-posix-path\\temp\\resolve node-mjs.test.mjs\\some file.txt').toString()
    assert.strictEqual(out,"some file.txt\n");
  });

});
