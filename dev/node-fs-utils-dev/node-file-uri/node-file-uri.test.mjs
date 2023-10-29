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
import path from "node:path";
import {rmAllFilesFromDir} from "#src/node-fs-utils/index.mjs";
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/**
 * file uri / windows / linux
 */
/**
 * move test data?
*/
function keyToHex(keyFilePath) {
    const keyData = fs.readFileSync(keyFilePath);
    return keyData.toString('hex');
}
import {pathToFileURL} from "node:url";
const keyPath = 'C:/Users/Jason/Downloads/encryption.key';
const hexKey = keyToHex(keyPath);
console.log(hexKey);
describe('node-file-uri.test.mjs', function(){
  /**
   *
   */
  it('file uri - first', function(){
    //convert to file uri
    const filePath = 'C:/Users/Jason/Downloads/encryption.key';
    const expected = 'file:///C:/Users/Jason/Downloads/encryption.key';
    const actual = pathToFileURL(filePath).toString();
    assert.strictEqual(actual,expected);

  });


});


