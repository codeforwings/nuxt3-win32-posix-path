import {describe, it} from "mocha";
import {cwd} from "node:process";
import {spawnExecCmd} from "##/dev/node-fs-utils-dev/SpawnCmd.mjs";
import assert from "node:assert";
import {resolve} from "node:path/posix";
import Path from "node:path";
import {spawnSync} from "node:child_process";
import fs from "node:fs";

import {dirname} from "node:path/posix"
import {fileURLToPath} from "node:url"
const __dirname = dirname(fileURLToPath(import.meta.url)); //Folder of current file (from file://url)
//import from url.fileURLToPath and path.dirname
const __filename = fileURLToPath(import.meta.url); //file (from file://url)
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `${__dirname}/temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
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

const pwsh = "c:/progra~1/PowerShell/7/pwsh.exe"
describe('spawncmd empty env', function(){
  it('nodejs dump env',function(done){
    process.env.NODE_FIRST_ARG = 'empty-env-node-dump'
    import('./generate-env.mjs').then(({generateEnv})=>{
      assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/empty-env-node-dump.raw.json"))
      done()
    });
  });
  it('dump env',function(){
    // fixme check
    writeToFile('no-env.raw.json',JSON.stringify(process.env,null,2));//this works... lol interesting
    const out = spawnSync(pwsh,['-c','Get-ChildItem env:'],{shell:true})
    writeToFile('no-env.txt',out.stdout);//this works... lol interesting
  });
  /**
   * https://github.com/codeforwings/nuxt3-win32-posix-path/issues/9
   *
   */
  it("try pwd no env",function(){
    this.timeout(8000);
    //shell-no-env.raw.json works but .txt doesnt...
    //
    let output,options;
    options = {
      // shell:false,
      // shell:"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      shell:true,
      env:{},
      envs:{
        NODE_FIRST_ARG:'shell-no-env',
        PWD:cwd(),
        //defn works when copied in... wonder what was missing
        "COMSPEC": "C:\\Windows\\system32\\cmd.exe",
        "HOMEDRIVE": "C:",
        "HOMEPATH": "\\Users\\Jason",
        "LOGONSERVER": "\\\\DESKTOP-2FU8K8O",
        // "PATH": "c:\\progra~1\\PowerShell\\7;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\Program Files (x86)\\OpenSSH\\;C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.7\\bin;C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.7\\libnvvp;C:\\Program Files\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files\\PuTTY\\;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\NVIDIA Corporation\\Nsight Compute 2022.2.0\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\Users\\Jason\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Program Files\\dotnet\\;C:\\SysinternalsSuite;C:\\Program Files (x86)\\Incredibuild;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\Public\\bins\\ffmpeg\\bin;C:\\Program Files\\PowerShell\\7\\;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\cygwin64\\bin;C:\\Users\\Jason\\AppData\\Local\\pnpm;C:\\Users\\Jason\\.amplify\\bin;C:\\Users\\Jason\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Jason\\AppData\\Local\\Programs\\GNU Octave\\Octave-6.2.0\\mingw64\\bin\\;C:\\Program Files (x86)\\GitHub CLI\\;C:\\Users\\Jason\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\BuildTools\\MSBuild\\Current\\Bin\\;C:\\Users\\Jason\\AppData\\Roaming\\npm;C:\\Program Files\\Sublime Text 3;C:\\Program Files (x86)\\Nmap;C:\\Users\\Jason\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\Jason\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Users\\Jason\\.dotnet\\tools;C:\\Program Files\\VirtViewer v11.0-256\\bin;C:\\Users\\Jason\\AppData\\Local\\Pandoc\\;C:\\Users\\Jason\\AppData\\Local\\Programs\\Tesseract-OCR;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\Users\\Jason\\AppData\\Roaming\\pypoetry\\venv\\Scripts;",
        "PATH": "c:\\progra~1\\PowerShell\\7;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\",
        "NODE_PATH": "C:\\Users\\Jason\\WebstormProjects\\nuxt3-win32-posix-path\\node_modules\\.pnpm\\node_modules",
        "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.JS;.WS;.MSC;.CPL",
        "PROMPT": "$P$G",
        "PSModulePath": "C:\\Users\\Jason\\OneDrive\\Documents\\PowerShell\\Modules;C:\\Program Files\\PowerShell\\Modules;c:\\progra~1\\powershell\\7\\Modules;;%ProgramFiles%\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules",
        "SYSTEMDRIVE": "C:",
        "SYSTEMROOT": "C:\\Windows",
        "TEMP": "C:\\Users\\Jason\\AppData\\Local\\Temp",
        "USERDOMAIN": "DESKTOP-2FU8K8O",
        "USERNAME": "Jason",
        "USERPROFILE": "C:\\Users\\Jason",
        "WINDIR": "C:\\Windows"
      }
    };
    //windowsVerbatimArguments: true,//for windows?
    //also it uses COMSPEC... interesting...
    // process.env.comspec = "C:\\Windows\\system32\\cmd.exe";//C:\Windows\system32\cmd.exe /d /s /c '"echo hi"'
    // output = spawnSync("echo",['hi'],{      shell:true,})
    /* cmd */
    output = spawnSync(`C:\\Windows\\system32\\cmd.exe`,[`/d /s /c`,"echo hi"],{      shell:false,windowsVerbatimArguments:true,      env:{
        // "COMSPEC": "C:\\Windows\\system32\\cmd.exe",
        // "HOMEDRIVE": "C:",
        // "HOMEPATH": "\\Users\\Jason",
        // "LOGONSERVER": "\\\\DESKTOP-2FU8K8O",
        // "PATH": "c:\\progra~1\\PowerShell\\7;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\Program Files (x86)\\OpenSSH\\;C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.7\\bin;C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.7\\libnvvp;C:\\Program Files\\Common Files\\Oracle\\Java\\javapath;C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\;C:\\Program Files\\PuTTY\\;C:\\ProgramData\\chocolatey\\bin;C:\\Program Files\\NVIDIA Corporation\\Nsight Compute 2022.2.0\\;C:\\Program Files (x86)\\NVIDIA Corporation\\PhysX\\Common;C:\\Program Files\\NVIDIA Corporation\\NVIDIA NvDLISR;C:\\Users\\Jason\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Program Files\\dotnet\\;C:\\SysinternalsSuite;C:\\Program Files (x86)\\Incredibuild;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\Public\\bins\\ffmpeg\\bin;C:\\Program Files\\PowerShell\\7\\;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\cygwin64\\bin;C:\\Users\\Jason\\AppData\\Local\\pnpm;C:\\Users\\Jason\\.amplify\\bin;C:\\Users\\Jason\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Jason\\AppData\\Local\\Programs\\GNU Octave\\Octave-6.2.0\\mingw64\\bin\\;C:\\Program Files (x86)\\GitHub CLI\\;C:\\Users\\Jason\\AppData\\Local\\GitHubDesktop\\bin;C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\BuildTools\\MSBuild\\Current\\Bin\\;C:\\Users\\Jason\\AppData\\Roaming\\npm;C:\\Program Files\\Sublime Text 3;C:\\Program Files (x86)\\Nmap;C:\\Users\\Jason\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\Jason\\AppData\\Roaming\\nvm;C:\\Program Files\\nodejs;C:\\Users\\Jason\\.dotnet\\tools;C:\\Program Files\\VirtViewer v11.0-256\\bin;C:\\Users\\Jason\\AppData\\Local\\Pandoc\\;C:\\Users\\Jason\\AppData\\Local\\Programs\\Tesseract-OCR;C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;C:\\Users\\Jason\\AppData\\Roaming\\pypoetry\\venv\\Scripts;",
        "PATH": "c:\\progra~1\\PowerShell\\7;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\", //enough for echo cmd...
        // "NODE_PATH": "C:\\Users\\Jason\\WebstormProjects\\nuxt3-win32-posix-path\\node_modules\\.pnpm\\node_modules",
        // "PATHEXT": ".COM;.EXE;.BAT;.CMD;.VBS;.JS;.WS;.MSC;.CPL",
        // "PROMPT": "$P$G",
        // "PSModulePath": "C:\\Users\\Jason\\OneDrive\\Documents\\PowerShell\\Modules;C:\\Program Files\\PowerShell\\Modules;c:\\progra~1\\powershell\\7\\Modules;;%ProgramFiles%\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules",
        // "SYSTEMDRIVE": "C:",
        // "SYSTEMROOT": "C:\\Windows",
        // "TEMP": "C:\\Users\\Jason\\AppData\\Local\\Temp",
        // "USERDOMAIN": "DESKTOP-2FU8K8O",
        // "USERNAME": "Jason",
        // "USERPROFILE": "C:\\Users\\Jason",
        // "WINDIR": "C:\\Windows"




      },})
    assert.strictEqual(output.status,0);
    assert.strictEqual(output.stdout.toString().replace('\r',''),"hi\n");
    /* pwsh */
    //windowsVerbatimArguments: true,//for windows? doesnt seem to really do anything
    output = spawnSync(pwsh,['-Command',"write-host hi"],{      shell:false,windowsVerbatimArguments:true,      env:{
        "PATH": "c:\\progra~1\\PowerShell\\7;C:\\windows\\system32;C:\\windows;C:\\windows\\System32\\Wbem;C:\\windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\windows\\System32\\OpenSSH\\", //enough for echo cmd...
      },});
    // console.log(output);
    // console.log(output.stderr.toString());
    // console.log(output.stdout.toString());
    assert.strictEqual(output.status,0);
    assert.strictEqual(output.stdout.toString().replace('\r',''),"hi\n");


    // output = spawnSync(pwsh,['dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1'],options)
    if(output.status !==0){
      console.error('stderr: ',output.stderr?.toString());
      console.error(output.error)
      throw output.error;
    }

  });
  it('dump env -pwsh',function(){
    // const jsonFile = Path.resolve(__dirname,`temp/pwsh-cli.raw.json`);//doesnt work for some reason todo
    const jsonFile = Path.resolve(__filename,`../temp/pwsh-cli.raw.json`);
    const txtFile = Path.resolve(__filename,`../temp/pwsh-cli.txt`);
    if(fs.existsSync(jsonFile)){
      fs.unlinkSync(jsonFile)
    }
    if(fs.existsSync(txtFile)){
      fs.unlinkSync(txtFile)
    }
    // console.log(__dirname);
    // console.log(jsonFile);
    const options = {
      // shell:true,
      shell:false,
    }
    const output = spawnSync(pwsh,['dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1 -NODE_FIRST_ARG "pwsh-cli"'],options)
    try{

      assert.strictEqual(output.status,0);
    }catch (e) {
      console.error('stdout: ',output.stdout?.toString());
      console.error('stderr: ',output.stderr?.toString());
      console.error('output: ',output);
      /* ENOENT not found */
      throw output.error;
    }
    assert.ok(fs.existsSync(jsonFile))
    assert.ok(fs.existsSync(txtFile))
    assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/pwsh-cli.raw.json"))
    assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/pwsh-cli.txt"))

  });
  it('spawnSync diff shell - no env',function(){
    const expected = 'hi\n';
    const options = {
      shell:false,//assuming pwsh... maybe check
      // shell:"c:/progra~1/PowerShell/7/pwsh.exe",//assuming pwsh... maybe check
      // argv0:"c:/progra~1/PowerShell/7/pwsh.exe",//assuming pwsh... maybe check
    }
    let cmd = "c:/progra~1/PowerShell/7/pwsh.exe"
    cmd = "c:/cygwin64/bin/bash.exe"
    cmd = "C:\\cygwin64\\bin\\bash.exe"
    const output = spawnSyncAssert(cmd,['-c','echo hi'],expected,options)
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

/**
 * Chaining env
 * raw cmd
 * inside pwsh
 * inside terminal
 */
describe('spawncmd env', function(){
  it('dump env',function(){
    writeToFile('ws-env.raw.json',JSON.stringify(process.env,null,2));//this works... lol interesting
    assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/ws-env.raw.json"))

    const out = spawnSync(pwsh,['-c','Get-ChildItem env:'],{shell:true})
    writeToFile('ws-env.txt',out.stdout.toString());//this works... lol interesting
    assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/ws-env.txt"))

  });
  //default
  it('dump env generate-env.mjs',function(done){
    this.timeout(8000);
    import('./generate-env.mjs').then(({generateEnv})=>{
      // generateEnv()//not needed
      assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/cli-env.raw.json"))
      done()
    });

  });
  //newname
  it('dump env generate-env.mjs newname',function(done){
    this.timeout(8000);
    process.env.NODE_FIRST_ARG = 'newname'
    import('./generate-env.mjs').then(({generateEnv})=>{
      // generateEnv()//not needed
      assert.ok(fs.existsSync("dev/node-fs-utils-dev/tests/dev-specific/temp/newname.raw.json"))
      //maybe grep NODE_FIRST_ARG from newname.raw.json
      done()
    });

  });
  /**
   * overriding defn loses some
   */
  it('dump env generate-env.mjs override',async function(){
    this.timeout(8000);
    //
    let output,options;
    output = spawnSync(pwsh,['dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1 -NODE_FIRST_ARG "shellt-cli"'],{shell:true})
    options = {
      shell:true,
      env:{
        NODE_FIRST_ARG:'override',
      }
    }
    //shell true
    // output = spawnSync(pwsh,['dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1 -NODE_FIRST_ARG "override-shellt-cli"'],options)
    output = spawnSync(pwsh,['dev/node-fs-utils-dev/tests/dev-specific/generate-env-logs.ps1 -NODE_FIRST_ARG "override-shellt-cli"'],options)

  });
  it('dump path to array PATH.json',function(){
    const output = process.env.PATH;
    writeToFile('PATH.json',JSON.stringify(output.split(Path.delimiter),null,2));
  })
});