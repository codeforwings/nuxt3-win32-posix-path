/**
 * Try something like spaces
 * @param inPathWin32
 * @return {*}
 */
export function pathWin32ToPosix(inPathWin32){
  return inPathWin32.replace(/\\/g,"/");
}
export function pathPosixToWin32(inPathPosix){
  return inPathPosix.replace(/\//g,"\\");
}
