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