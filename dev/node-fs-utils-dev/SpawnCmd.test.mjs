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
 * Can i use utils promisify?
 * also try readline?
 */
import {promisify} from 'node:util';
import {spawn,spawnSync} from 'node:child_process';
import {spawnExecCmd} from "##/dev/node-fs-utils-dev/SpawnCmd.mjs";
import {cwd} from 'node:process';
function assertEcho(actual,expected){
      assert.strictEqual(actual.replace(/\r/g,''),expected);

}
describe('SpawnCmd.test.mjs', function(){
  it('spawnExecCmd', async function(){
    this.timeout(5000);
    let out;
    out = await spawnExecCmd('echo hi',[],{shell:true});
    // console.log(out);
    assertEcho(out.stdout,'hi\n');
  });
  it('spawnSync', async function(){
    this.timeout(5000);
    let out;
    /** @type {SpawnSyncReturns<string>} */
    out = await spawnSync('echo hi',[],{shell:true});
    const {stdout,output,status,signal,pid,stderr} = out;
    const hello = stdout.toString();
    assert.strictEqual(stdout.constructor.name,'Buffer')
    assert.strictEqual(typeof stdout,'object');
    // console.log(out);
    //UintArrasy
    // const tmp = new Uint8Array(stdout);
    assertEcho(hello,'hi\n');
  });

});
/**
 * look at
 * spawnCmd-cwd.test.mjs
 * for device specific
 */

//
describe('SpawnCmd.test.mjs experiments', function(){
  /**
   * doesnt work
   */
  it.skip('promisfy spawncmd experiment', async function(){
    this.timeout(5000);
    let out;
    const subprocess = promisify(spawn);
    out = await subprocess('echo hi',[],{shell:true});
    console.log(out);
  });
});
