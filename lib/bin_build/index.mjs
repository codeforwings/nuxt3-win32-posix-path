/**
 * Bin Build Index Packager
 * maybe add cli builder / handler here
 lib/bin_build/dist/index-win.exe c:/Users/Public/Documents

 node lib/bin_build/index.mjs c:/Users/Public/Documents
 node lib/bin_build/index.mjs "c:/Users/Public/Docum ents"
 node lib/bin_build/index.mjs c:/Users/Public/Docum ents
 *
 * todo think about how to test this properly performance wise
 * it's surprisingly not bad. powershell was much slower...
 */
// import process from "node:process";
import {win32ToWin32WSL2} from "##/src/win32ToWin32WSL/win32ToWin32WSL2.mjs";
// export {win32ToWin32WSL2}

/* take arguments from command line */
const args = process.argv.slice(2);
// console.log(args);
// console.log(win32ToWin32WSL2(args[0]))
console.log(win32ToWin32WSL2(args.join(' ')))
process.exit(0)
