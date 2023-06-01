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

function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}


/**
 * Add utils from node-scratchpad - should really publish that file as a module
 * along with deploy script
 * later
 *
 * readme_windowsOS.md for more information about envs
 * should maybe be a seperate project
 */
import {fileURLToPath} from "node:url"
import {dirname} from "node:path"
import path from "node:path";
describe('windowsEnvPaths.test.mjs', function(){
  it('Single Test', function(){
    //assert.strictEqual(1,1);//require assert
    //APPDATA
    //USERPROFILE
    //HOMEPATH
    //LOCALAPPDATA


    //https://stackoverflow.com/questions/21363912/how-to-resolve-a-path-that-includes-an-environment-variable-in-nodejs
    //might need regex to expand
    let a = "C:\\Users\\Jason\\WebstormProjects\\nuxt3-win32-posix-path\\dev\\windows_env_paths\\windowsEnvPaths.test.mjs";
    let ae = "%USERPROFILE%\\WebstormProjects\\nuxt3-win32-posix-path\\dev\\windows_env_paths\\windowsEnvPaths.test.mjs";
    //expand ae from process.env
    // python might be faster using pandas here
    //regex to extract %<env>%
    //then replace with process.env.<env>
    //todo
    const re = /%([^%]+)%/g;
    const match = ae.match(re);
    // console.log(match);

    //can't open anywhere except for explorer and cmd
    //should double check if i need to resolve it... or use process.env.USERPROFILE
    // console.log(process.env.USERPROFILE);//might be better tbh
    //not that useful im afraid
    //C:\Users\Jason\WebstormProjects\nuxt3-win32-posix-path\dev\windows_env_paths\windowsEnvPaths.test.mjs
    // console.log(a+":1:1"); //this works in node js
    // console.log(ae+":1:1"); //maybe need somethign to resolve it...

    //defn not resolve
    // console.log(path.resolve(ae)); //maybe need somethign to resolve it...
    // console.log(path.normalize(ae)); //maybe need somethign to resolve it...
    console.log(path.join(ae)); //maybe need somethign to resolve it...
  });
  it('Ps1 env', function(){
    //assert.strictEqual(1,1);//require assert
    //APPDATA
    //USERPROFILE
    //HOMEPATH
    //LOCALAPPDATA
  });
  /**
   * file:///C:/Users/Jason/WebstormProjects/nuxt3-win32-posix-path/dev/windows_env_paths/
   * cmd.exe cannot launch, chrome can
   */
  it('file uri?', function(){
    //assert.strictEqual(1,1);//require assert
    //APPDATA
    //USERPROFILE
    //HOMEPATH
    //LOCALAPPDATA

    const __filename = fileURLToPath(import.meta.url); //file (from file://url)
    console.log(import.meta.url);
    console.log(__filename);
  });






});
