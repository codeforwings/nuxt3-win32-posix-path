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
// import process from "node:process"; //this will break argv for w/e reason
import {win32ToWin32WSL2} from "##/src/win32ToWin32WSL/win32ToWin32WSL2.mjs";
// export {win32ToWin32WSL2}

/* take arguments from command line */
const args = process.argv.slice(2);
// might want to check / extract this function
if(process.platform === 'win32'){
  console.log(win32ToWin32WSL2(args.join(' ')))
}else{
  /** instead of doing this... perhaps it should just be escaped properly */
  // have to escape backslash that's not quoted
  // const argsJoined = args.join(' ')
  const argsJoined = args.join(' ').replace(/\\/g,"\\\\")
  //if start and end with quotes, then don't escape
  if(/^['"].*?['"]$/.test(argsJoined)){
    console.log(win32ToWin32WSL2(argsJoined))
  }else{
    // console.log(win32ToWin32WSL2(argsJoined.replace(/\\/g,"\\\\")))
    console.log(win32ToWin32WSL2(argsJoined))
  }
}
// console.log(args);
// console.log(win32ToWin32WSL2(args[0]))
process.exit(0)
