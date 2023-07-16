import {describe, it} from "mocha";
import {cwd} from "node:process";
import {spawnExecCmd} from "##/dev/node-fs-utils-dev/SpawnCmd.mjs";
import assert from "node:assert";
import {resolve} from "node:path/posix";
import {spawnSync} from "node:child_process";
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
  it('parent of filepath exists', async function(){
    const childFolderInput = '/cygdrive/c/Users/Public/Downloads';
    const expected = '/cygdrive/c/Users/Public';
    const actual = resolve(childFolderInput,'..');
    assert.strictEqual(actual,expected);

  });
  //works as expected
  it('parent of filepath dne', async function(){
    const childFolderInput = '/cygdrive/c/Users/Public/fsdfsdce';
    const expected = '/cygdrive/c/Users/Public';
    const actual = resolve(childFolderInput,'..');
    assert.strictEqual(actual,expected);

  });
});


/**
 * spawnSyncAssert - for testing... maybe export later
 * @param cmd
 * @param args
 * @param expected
 * @param options
 * @return {SpawnSyncReturns<Buffer>}
 */
function spawnSyncAssert(cmd,args,expected,options={}){
  const actualOptions = {shell:true,...options};
  const out = spawnSync(cmd,args,actualOptions)
  if(out.status !==0){
    console.error('stderr: ',out.stderr?.toString());
    console.error(out.error)
    throw out.error;
  }
  const stdout = out.stdout?.toString();
  assert.strictEqual(stdout,expected)
  return out;

}
/**
 * Empty webstorm runner.
 * i.e. no env variables, no runner. save to project file
 */
describe('spawncmd empty env', function(){
  it('try catch lets',function(){
    let a,b;
    function getAB(){
      a = 'a';
      b = 'b';
    }


  });

  it('spawnSync diff shell - no env',function(){
    const expected = 'hi\n';
    const options = {
      shell:true,
    }
    const output = spawnSyncAssert('echo',['hi'],expected,options)
  })
  it('spawnSync - no env',function(){
    const expected = 'hi\n';
    const output = spawnSyncAssert('echo',['hi'],expected)
  })
  it('printenv spawnsync - no env',function(){
    const expected = 'hi\n';
    const output = spawnSyncAssert('set',[],expected)
  })

});