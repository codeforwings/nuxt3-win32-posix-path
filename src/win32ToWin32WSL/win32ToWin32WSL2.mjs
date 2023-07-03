/**
 * Quick and dirty script to convert a Windows path to a WSL2 path
 * been doing this manually for too much today.
 *
 * ths might work?
 * pathWin32ToPosix
 *
 * doesnt make much sense though... should just convert to ps1 / bash and run test on it.
 * exe is too big, also has to go to stdout...
 */
// import {pathWin32ToPosix} from "./pathReplacement.mjs";
import {pathWin32ToPosix} from "#src/pathReplacement.mjs";

/**
 *
 * @param win32Path {string} - Windows Path - Example: C:\Users\Public\Documents
 * @return {string} - WSL2 Path - Example: /mnt/c/Users/Public/Documents
 * @constructor
 * todo spaces and quotes
 */
export function win32ToWin32WSL2(win32Path){
  let wsl2Path;
  /* replace \ with / */
  wsl2Path = pathWin32ToPosix(win32Path);
  /* convert Drive letter to /mnt/<lowercase>/ */
  wsl2Path = wsl2Path.replace(/^([a-zA-Z]):/,(match,p1)=>{
    // console.log(match);//match is C:
    return '/mnt/' + p1.toLowerCase();
  })
  //trim check for quotes  / validation later

  return wsl2Path;
}

/**
 * Useful for cygwin etc.
 * Since both powershell and cmd takes this path name
 * Reusing the same function as wsl... so leaving the drive lowercase
 * @param win32Path
 * @return {string}
 * todo spaces and quotes
 * assuming valid paths
 */
export function win32ToWin32Slash(win32Path){
  let win32Slash;
  /* replace \ with / */
  win32Slash = pathWin32ToPosix(
    win32Path,"` "

  );
  /* convert Drive letter to /mnt/<lowercase>/ */
  win32Slash = win32Slash.replace(/^([a-zA-Z]):/,(match,p1)=>{
    // console.log(match);//match is C:
    return p1.toLowerCase() + ':';
  })
  //trim check for quotes  / validation later

  return win32Slash;
}
export default {win32ToWin32WSL2}