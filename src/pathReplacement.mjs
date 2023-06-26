/**
 * Try something like spaces
 * should remove quotes from start and fnish
 * @param inPathWin32
 * @return {*}
 */
export function pathWin32ToPosix(inPathWin32){
  return inPathWin32.trim()
    .replace(/\\\\/g,'\\')//todo check me... for network unc paths
    .replace(/\\/g,"/")// \ to /
    .replace(/ /g,"\\ ")
    .replace(/^["']/,'')
    .replace(/["']$/,'')
  ;

  /* might be a good idea to add quotes, but only for coding in gitbash on windows */
  // return "'" + inPathWin32.trim()
  //   .replace(/\\/g,"/")// \ to /
  //   .replace(/ /g,"\\ ") + "'"
  //   ;
}
export function pathPosixToWin32(inPathPosix,sQuote="'"){
  //to win32 should surround with quotes if it has spaces
  const win32Path = inPathPosix.trim()
    .replace(/\//g,"\\")
    // .replace(/ /g,"\\ ") ;
    .replace(/\\ /g," ")
  ;
  return / /.test(win32Path) ? `${sQuote}${win32Path}${sQuote}` : win32Path;
}
export default {pathWin32ToPosix}
