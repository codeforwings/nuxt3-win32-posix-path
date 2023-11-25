
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

export function replaceProgramFiles(sInput='',is64bit=true){
  //fix later. should just early exit
  const sProgramFiles86 = !is64bit ? 'progra~1' : 'progra~2'; // i think x86 is progra~2 for 64bit
  const sProgramFiles = is64bit ? 'progra~1' : 'progra~2'; // i think x86 is progra~2 for 64bit
  return sInput
    .replace(/Program Files/gi,sProgramFiles)
    .replace(/Program Files \(x86\)/ig,sProgramFiles86)
    .replace(/Program Data/ig,'progra~3');//i mean who cares about x86
}

export default {win32ToWin32JS}
