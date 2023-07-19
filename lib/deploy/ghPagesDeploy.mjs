import {spawnExecCmd} from "##/dev/node-fs-utils-dev/SpawnCmd.mjs";

/**
 * fixme... this is from the nuxt dayhs note vite
 * need to fix / clean this up / make a gist / append with workspace and *
 * maybe cross-env? or dotenv
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
import fs from 'node:fs';
/* set env variable */
process.env.NUXT_APP_BASE_URL="/nuxt3-win32-posix-path/"

//i.e. rename and then rename back... might be too late for it to even work
// fixme vite.config.mjs...
//workaround 1/2
const viteConfigPath = 'vite.config.mjs'
// const viteConfigTmp = '.vite.config.mjs.tmp'
const viteConfigTmp = '.bak.vite.config.mjs.bak'
if(fs.existsSync(viteConfigPath)){
  fs.renameSync(viteConfigPath,viteConfigTmp)
}

//build
{
  //because nuxt3 is broken, at least this version. fixme update later. version is 3...
  // latest is 3.5... and uses vite i believe... nowonder this felt so odd
  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync('.nuxt', { recursive: true, force: true });//feels like it has to be done outside

  // const {cmd,stdout,stderr,code,signal} = await execCmdOnController('pnpm run build')//vite
  let cmd,stdout,stderr,code,signal
  try{

    ({cmd,stdout,stderr,code,signal} = await spawnExecCmd('pnpm run generate'));//nuxt3 static
  }catch (e) {
    throw e
  }finally {
    // fixme vite.config.mjs... update nuxt...
    //workaround 2/2
    if(fs.existsSync(viteConfigTmp)){
      fs.renameSync(viteConfigTmp,viteConfigPath)
    }
  }
  console.log(stdout);
  if(stderr || code !== 0){
    console.error(stderr);

  }
  if(code !==0){process.exit(code)}

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
