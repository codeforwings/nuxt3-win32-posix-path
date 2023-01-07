/**
 * NODE_ENV=development pnpm install
 * pnpm run testPathSep
 */
import {sep} from "node:path";
import assert from 'node:assert';

/* This will be run from linux */
assert.strictEqual(sep,"/");
console.log('Done')
