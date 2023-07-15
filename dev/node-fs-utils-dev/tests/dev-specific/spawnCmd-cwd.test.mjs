import {describe, it} from "mocha";
import {cwd} from "node:process";
import {spawnExecCmd} from "##/dev/node-fs-utils-dev/SpawnCmd.mjs";
import assert from "node:assert";

/**
 * Device specific nt machine with cygwin
 */
describe('spawnCmd-cwd.test.mjs - cygwin', function(){
  it('spawnExecCmd cwd nt cygwin', async function(){
    //assuming cygwin
    this.timeout(5000);
    let out;
    const currentDir = cwd();
    let shell
    // shell = `C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;//slow though
    shell = true; //23 ms... vs like 1.5s with powershell
    out = await spawnExecCmd('C:\\cygwin64\\bin\\pwd.exe',[],{shell,cwd:currentDir});
    const {stdout,output,status,signal,pid,stderr} = out;
    assert.match(stdout.replace('\n',''),/nuxt3-win32-posix-path$/);
  });
  it('spawnExecCmd cwd nt cygwin public', async function(){
    //assuming cygwin
    const expected = '/cygdrive/c/Users/Public';
    this.timeout(5000);
    let out;
    let shell,cwd
    shell = true; //23 ms... vs like 1.5s with powershell
    cwd = "c:/Users/Public"
    out = await spawnExecCmd('C:\\cygwin64\\bin\\pwd.exe',[],{shell,cwd});
    const {stdout,output,status,signal,pid,stderr} = out;
    const actual = stdout.replace('\n','');
    assert.strictEqual(actual,expected);
    // console.log(out);
  });
  it('pnpm version', async function(){
    let out;
    out = await spawnExecCmd('pnpm',['--version'],{shell:true});
    assert.match(out.stdout,/^\d+\.\d+\.\d+\n$/);//i.e. 8.6.5

    // out = await spawnExecCmd('where.exe',['pnpm'],{shell:true});
    // assert.match(out.stdout,/^\d+\.\d+\.\d+\n$/);//i.e. 8.6.5
  });
});
