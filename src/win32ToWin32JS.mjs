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

/**
 * Converts Javascript Path to Windows Path (slash)
 * @param sInput {string} - C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md
 * @param sep {string} - default is /
 * @return {string}
 */
export function win32JSToWin32(sInput='',sep='/'){
  return sInput
    .trim()
    .replace(/\\\\/g,sep)//todo check me... for network unc paths
    .replace(/\\/g,sep)//wonder if i need to escape the spaces
    // .replace(/\\\\/g,'\\')//todo check me... for network unc paths
    // .replace(/\\/g,'\\\\')//wonder if i need to escape the spaces
}

export default {win32ToWin32JS}
