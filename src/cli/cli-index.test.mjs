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
import {spawnSync} from "node:child_process";
import os from "node:os";

function writeToFile(fileName,data,space=2){
    const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
    const filePath = `dev/pbs/test/${sFileName}`
    fs.writeFileSync(filePath,
        typeof data === 'string' ? data :JSON.stringify(data,null,+space)
    );
}

describe('cli-index.test.mjs', function(){
    it('verify command line mjs', function(){
        //assert.strictEqual(1,1);//require assert
        const expected = "/mnt/c/Users/Public/bins\n"
        const out = spawnSync('node src/cli/index.mjs',["C:\\Users\\Public\\bins"],{shell:true})
        const stdout = out.stdout.toString();
        if(out.status !==0){
            console.error(out.stderr.toString())
            throw out.error;
        }
        assert.strictEqual(stdout,expected)

    });
    it('verify command line mjs error', function(){
        //assert.strictEqual(1,1);//require assert
        const out = spawnSync('node src/cli/index.mjs',[],{shell:true})
        // console.log(out.stdout.toString());
        if(out.status !==0){
            assert.ok(true)
            // console.error(out.stderr.toString())
            // throw out.error;
        }
    });

});
describe('cli-index.test.mjs binary win', function(){
    // const binaryPath= "lib/dist/bins"
    const binaryCommand = '"lib/dist/bins/index-win.exe"'
    const binaryCommandWSL = './lib/dist/bins/index-linux'
    if(os.platform()    !== 'win32'){
        return true;
    }

    it('verify command line mjs', function(){
        //assert.strictEqual(1,1);//require assert
        const expected = "/mnt/c/Users/Public/bins\n"
        const out = spawnSync(binaryCommand,["C:\\Users\\Public\\bins"],{shell:true})
        const stdout = out.stdout.toString();
        if(out.status !==0){
            console.error(out.stderr.toString())
            throw out.error;
        }
        assert.strictEqual(stdout,expected)

    });
        it('verify command line wsl', function(){
        //assert.strictEqual(1,1);//require assert
        const expected = "/mnt/c/Users/Public/bins\n"
        const out = spawnSync('wsl -e',[binaryCommandWSL,"C:\\Users\\Public\\bins"],{shell:true})
        const stdout = out.stdout.toString();
        if(out.status !==0){
            console.error(out.stderr.toString())
            throw out.error;
        }
        assert.strictEqual(stdout,expected)

    });
    it('verify command line mjs error', function(){
        //assert.strictEqual(1,1);//require assert
        const out = spawnSync(binaryCommand,[],{shell:true})
        // console.log(out.stdout.toString());
        if(out.status !==0){
            assert.ok(true)
            // console.error(out.stderr.toString())
            // throw out.error;
        }
    });

});