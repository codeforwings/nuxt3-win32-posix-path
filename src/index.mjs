/**
 * Rolling up useful functions here
 * that's one ay of oding it
 */

import {pathWin32ToPosix,pathPosixToWin32} from "#src/pathReplacement.mjs";
// import {pathWin32ToPosix,pathPosixToWin32} from "~/src/pathReplacement.mjs";
export {pathWin32ToPosix,pathPosixToWin32}

import {win32ToWin32WSL2,win32ToWin32Slash,win32ToCygwin} from "#src/win32ToWin32WSL/win32ToWin32WSL2.mjs";
// import {win32ToWin32WSL2,win32ToWin32Slash,win32ToCygwin} from "~/src/win32ToWin32WSL/win32ToWin32WSL2.mjs";
export {win32ToWin32WSL2,win32ToWin32Slash,win32ToCygwin}

import {win32ToWin32JS} from "#src/win32ToWin32JS.mjs";
// import {win32ToWin32JS} from "~/src/win32ToWin32JS.mjs";
export {win32ToWin32JS}

// <!--    todo cygwin "/cygdrive/c/" to c:/ -->