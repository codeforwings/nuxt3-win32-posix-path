/**
 * NODE_ENV=development pnpm install
 * pnpm run testPathSep:os
 * just for concept
 */
import {sep} from "node:path";
import assert from 'node:assert';
import os from 'node:os';
/**
 * if linux
 * */
if(os.platform() =='win32'){
  console.log('win32: ',sep)
  assert.strictEqual(sep,"\\")
}else{ /* This will be run from posix */
  console.log('posix: ',sep)
  assert.strictEqual(sep,"/")

}