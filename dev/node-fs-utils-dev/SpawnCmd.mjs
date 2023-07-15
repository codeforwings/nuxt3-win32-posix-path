/**
 * https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
 * og from nuxt3-win32-posix-path/dev/node-fs-utils-dev
 * spawn for executing commands on controller. make it SSH2Pool like?
 * future add support for abort / signal
 *
 * is useless currently. because spawnSync exists
 * this might ony be needed for streams
 */
import { spawn } from 'node:child_process'
import {stdout,stderr} from 'node:process'

/** might be better just to use buffer like they are */
export function spawnExecCmd(cmd,args=[],opts={}){
  const actual = {shell:true,...opts}
  return new Promise((resolve, reject) => {
    let code, stdouts = [], stderrs = [], signal;

    // let spawnCmd = spawn(cmd,[],{shell:true});
    let spawnCmd = spawn(cmd,args,actual);

    //i think on error need to double check
    spawnCmd.on('error',(err)=>{
      reject(err);
    });
    spawnCmd.stdout.pipe(stdout);//works
    spawnCmd.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      stdouts.push(data);
    });
    /* doesnt work pipe on chai, but two on's work n*/

    spawnCmd.stderr.pipe(stderr)
    spawnCmd.stderr.on('data', (data) => {
      // console.error(`stderr: ${data}`);
      stderrs.push(data);
    });
    //close after exit
    spawnCmd.on('close', (_code,_signal) => {
      // console.log(`child process exited with code ${code} ${signal}`);
      code=_code;
      signal=_signal;
      let stdout,stderr;
      if(stdouts.length > 0) stdout = stdouts.join('\n')
      if(stderrs.length > 0) stderr = stderrs.join('\n')

      return resolve({cmd,stdout,stderr,code,signal})

    });
  });
}
export default {spawnExecCmd}
