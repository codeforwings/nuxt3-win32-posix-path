import {win32ToWin32WSL2} from "##/src/index.mjs";

/**
 * pnpm install has-flag -D
 * https://github.com/sindresorhus/has-flag
 * if flags are needed
 */
const args = process.argv;
const [nodePath,scriptPath,...scriptArgs] = args;
// console.log(scriptArgs);
/* lazy validation*/
if(scriptArgs.length !== 1){
    console.error('error: invalid args');
    process.exit(1);
}
const wslPath = win32ToWin32WSL2(scriptArgs[0])
console.log(wslPath);
