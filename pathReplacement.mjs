/**
 * Try something like spaces
 * @param inPathWin32
 * @return {*}
 */
export function pathWin32ToPosix(inPathWin32){
  return inPathWin32.trim()
    .replace(/\\/g,"/")// \ to /
    .replace(/ /g,"\\ ") ;

  /* might be a good idea to add quotes, but only for coding in gitbash on windows */
  // return "'" + inPathWin32.trim()
  //   .replace(/\\/g,"/")// \ to /
  //   .replace(/ /g,"\\ ") + "'"
  //   ;
}
export function pathPosixToWin32(inPathPosix){
  return inPathPosix.replace(/\//g,"\\");
}
export default {pathWin32ToPosix}
