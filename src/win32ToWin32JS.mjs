/**
 *
 * @param sInput - C:\Users\Jason\OneDrive\Documents\2022\someMD.md
 */
export function win32ToWin32JS(sInput=''){
  return sInput
    .trim()
    .replace(/\\\\/g,'\\')//todo check me... for network unc paths
    .replace(/\\/g,'\\\\')//wonder if i need to escape the spaces
}

export default {win32ToWin32JS}
