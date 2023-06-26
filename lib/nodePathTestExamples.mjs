export function C(input,expected) {
  return {input,expected}
}
/**
 * win32 to posix
 * @type {{input, expected}[]}
 */
export const win32Tests = [
  C(
    // String.raw`C:\Users\Administrator\OneDrive\Documents\2022\someMD.md`,//doesnt work,1
    "C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md",
    "C:/Users/Jason/OneDrive/Documents/2022/someMD.md"
  ),
  /* directory */
  C(
    "C:\\Users\\Jason\\OneDrive\\Documents\\2022",
    "C:/Users/Jason/OneDrive/Documents/2022"
  ),
  C(
    "'C:\\Users\\Jason\\OneDrive\\Documents\\2022'",//single quote
    "C:/Users/Jason/OneDrive/Documents/2022"
  ),
  C(
    '"C:\\Users\\Jason\\OneDrive\\Documents\\2022"',//double quote
    "C:/Users/Jason/OneDrive/Documents/2022"
  ),
  C(
    "C:\\Users\\Jason\\OneDrive - Code for Wings\\rick and morty",
    "C:/Users/Jason/OneDrive\\ -\\ Code\\ for\\ Wings/rick\\ and\\ morty"//test might not work in reverse
    // "C:/Users/Jason/OneDrive - Code for Wings/rick and morty"//test might not work in reverse. but it does
  )
  // for windows expected, single / double quote if there are spaces
  // 'C:\Users\Jason\OneDrive - Code for Wings'
];
/* posix to win32 */
export const posixTests = [
  C(
    // String.raw`C:\Users\Administrator\OneDrive\Documents\2022\someMD.md`,//doesnt work,1
    'C:/Users/Jason/OneDrive/Documents/2022/someMD.md',
  "C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md"
  ),
  /* directory */
  C(

    "C:/Users/Jason/OneDrive/Documents/2022",
  "C:\\Users\\Jason\\OneDrive\\Documents\\2022"
  ),
  C(

    "C:/Users/Jason/OneDrive\\ -\\ Code\\ for\\ Wings/rick\\ and\\ morty",
  "'C:\\Users\\Jason\\OneDrive - Code for Wings\\rick and morty'"
  )
  // for windows expected, single / double quote if there are spaces
  // 'C:\Users\Jason\OneDrive - Code for Wings'
  // add some random examples for ubuntu related stuff
];
/**
 * todo backtick / consolidate. also should check if exists etc... using various
 * c:/Users/Public/temp` spaces/a/b` c/d
 * spawnCmd probably the easiest way to do this?
 *
 */