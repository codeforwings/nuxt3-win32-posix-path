/**
 *
 * @param sInput - C:\Users\Jason\OneDrive\Documents\2022\someMD.md
 */
export function win32ToWin32JS(sInput=''){
  return sInput.replace(/\\/g,'\\\\')//wonder if i need to escape the spaces
}

export default {win32ToWin32JS}
