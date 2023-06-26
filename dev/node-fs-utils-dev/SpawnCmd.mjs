/**
 * https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
 *
 * spawn for executing commands on controller. make it SSH2Pool like?
 * future add support for abort / signal
 *
 * is useless currently. because spawnSync exists
 * this might ony be needed for streams
 */
import { spawn } from 'node:child_process'
import {stdout,stderr} from 'node:process'

/** might be better just to use buffer like they are */
export function spawnExecCmd(cmd,...args){
  return new Promise((resolve, reject) => {
    let code, stdouts = [], stderrs = [], signal;

    let spawnCmd = spawn(cmd,[],{shell:true});

    //i think on error need to double check
    spawnCmd.on('error',(err)=>{
      reject(err);
    });
    spawnCmd.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      stdouts.push(data);
    });
    spawnCmd.stdout.pipe(stdout);//works
    /* doesnt work pipe on chai, but two on's work n*/

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
