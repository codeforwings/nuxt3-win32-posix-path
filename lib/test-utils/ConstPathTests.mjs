export const WSLPassTests = [
  ["C:\\Users\\Public\\Documents","/mnt/c/Users/Public/Documents"],//maybe append with quotes instead?
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\\\Users\\\\Public\\\\Documents","/mnt/c/Users/Public/Documents"],
  //todo look into thje backtick
  // ["C:\\Users\\Public\\temp` spaces\\a\\b` c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
]
//should work with changing the length of the array
const ogLength = WSLPassTests.length
for (let i = 0; i < ogLength; i++) {
  const row = WSLPassTests[i];
  row[2] = i;
  WSLPassTests.push([`'${row[0]}'`,row[1],`${i}1`]);//append with single quotes
  WSLPassTests.push([`"${row[0]}"`,row[1],`${i}2`]);//append with double quotes

}

//todo add the ones inside of cygwin64...
// but should be ok? add issue to github
export const CygwinPassTests = [
  ["C:\\cygwin64\\bin\\bash.exe","/cygdrive/c/cygwin64/bin/bash.exe"],
  ["C:\\Users\\Public\\Documents","/cygdrive/c/Users/Public/Documents"],//maybe append with quotes instead?
  ["C:\\Users\\Public\\Documents","/cygdrive/c/Users/Public/Documents"],//maybe append with quotes instead?
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/cygdrive/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\Users\\Public\\temp spaces\\a\\b c\\d","/cygdrive/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
  ["C:\\\\Users\\\\Public\\\\Documents","/cygdrive/c/Users/Public/Documents"],
  //todo look into thje backtick
  // ["C:\\Users\\Public\\temp` spaces\\a\\b` c\\d","/mnt/c/Users/Public/temp\\ spaces/a/b\\ c/d"],
]
//should work with changing the length of the array
//clean up this. maybe convert it to yaml
{
  const ogLength = CygwinPassTests.length
  for (let i = 0; i < ogLength; i++) {
    const row = CygwinPassTests[i];
    row[2] = i;
    CygwinPassTests.push([`'${row[0]}'`, row[1], `${i}1`]);//append with single quotes
    CygwinPassTests.push([`"${row[0]}"`, row[1], `${i}2`]);//append with double quotes

  }
}