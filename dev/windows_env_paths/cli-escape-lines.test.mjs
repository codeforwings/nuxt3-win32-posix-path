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
 *
 * @param line {string}
 * @returns {string|null}
 */
function handleBashLine(line){
  /* this regex checks for empty lines and lines with only comments */
  if(/^\s*#$/.test(line)) return null;
  const rowWithoutComment = line
        .replace(/#.*$/,'')
        .trim();
  if(rowWithoutComment === '') return null;
  return rowWithoutComment;
}
describe('handleBashLine', function(){
  it('empty line', function(){
    const line = '';
    const expected = null;
    const result = handleBashLine(line);
    assert.strictEqual(result,expected);
  });
  it("comment line", function(){
    const line = '# some comments';
    const expected = null;
    const result = handleBashLine(line);
    assert.strictEqual(result,expected);
  });
  /* need to double check space infront of hash but leave for now */
  it('comment at end of line', function(){
    const line = 'echo hi # some comments';
    const expected = "echo hi";
    const result = handleBashLine(line);
    assert.strictEqual(result,expected);
  });
});
describe('cli-escape-lines.test.mjs', function(){
  let filePath = "dev/windows_env_paths/cli-escape-lines.txt.sh"

  /** @type {string} */
  let rawData;
  /** @type {string[]} */
  let data;
  before(()=>{
    /* load file */
    rawData = fs.readFileSync(filePath,'utf8')
      .replace(/\r\n/g,'\n');
    data = rawData.split('\n')
  });
  it('Ignore # and empty lines', function(){
    //assert.strictEqual(1,1);//require assert
    assert.strictEqual(typeof rawData,'string');
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      /* extract content before # and ignore empty */
      const rowWithoutComment = row
        .replace(/#.*$/,'')
        .trim();
      const regexExtract = /^#|^ #/;
      const regexEmpty = /^\s*$/;
      regexExtract.match


    }



    console.log(bData);
  });
});
