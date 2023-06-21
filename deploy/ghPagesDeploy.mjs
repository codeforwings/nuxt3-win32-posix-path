/**
 * pnpm install gh-pages -D
 * https://yarnpkg.com/package/gh-pages
 *
 * pnpm run build
 *
 * make sure this file is run as root
 *
 * for nuxt3... it should really remove .nuxt and .output
 * Maybe look at changing it
 *
 * deploy/
 *
 */
const dir = 'dist';//or from env variable? perhaps or from args
import * as ghpages from 'gh-pages'
import {execCmdOnController} from "./SpawnExecOnController.mjs";
import fs from 'node:fs';
process.env.NUXT_APP_BASE_URL="/nuxt3-win32-posix-path/"
//build
{
  //because nuxt3 is broken, at least this version. fixme update later. version is 3...
  // latest is 3.5... and uses vite i believe... nowonder this felt so odd
  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync('.nuxt', { recursive: true, force: true });

  // const {cmd,stdout,stderr,code,signal} = await execCmdOnController('pnpm run build')//vite
  const {cmd,stdout,stderr,code,signal} = await execCmdOnController('pnpm run generate')//nuxt3 static
  console.log(stdout);
  if(stderr || code !== 0){
    console.error(stderr);

  }
  if(code !==0){process.exit()}

}
/* add nojekyl */
fs.writeFileSync(dir+"/.nojekyll","");

const options = {
  dotfiles:true,
}
await ghpages.publish(dir, options, function(err) {
  if(err){
    console.error('publish error',err);
  }else{
    console.log('Pushed')
  }
});
