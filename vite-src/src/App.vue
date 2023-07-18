<template>
  <div id="app">
    <!--    sOutputWin32ToPosix />-->
    <!--    Raaw commands are rarely ever used .... revisit later-->
    <div v-if="1===12">
      <h1>Win32 To Posix</h1>
      <textarea
        className="area"
        v-model="sInputWin32"
      />

      <textarea className="area"
                :value="sOutputWin32ToPosix"
      />
      <br/>
    </div>
    <!--    sOutputPosixToWin32 , todo auto fix sep etx.../>-->
    <h1>Posix to Win32</h1>
    <textarea className="area"
              v-model="sInputPosix"
    />

    <textarea className="area"
              :value="sOutputPosixToWin32"
    />
    <!--    Win32 Normalized / JS />-->
    <h1>Win32 to Win32JS</h1>
    <textarea className="area"
              v-model="sInputWin32Normal"
    />
    <textarea className="area"
              :value="sOutputWin32Normal"
    />
    <!--    Win32 wsl - make this append / cydrive?
    https://github.com/codeforwings/nuxt3-win32-posix-path/issues/3
    />-->
    <h1>Win32 to Win32 WSL mnt</h1>
    <textarea className="area"
              v-model="sWin32ToWsl"
    />
    <textarea className="area"
              :value="sOutputWin32ToWsl"
    />
    <h1>Win32 to Cygwin</h1>
    <!--    todo cygwin path base. i.e. /usr/local/bin? or no -->
    <textarea className="area"
              v-model="sWin32ToCygwin"
    />
    <textarea className="area"
              :value="sOutputWin32ToCygwin"
    />
    <!--    fixme make loop or something / component -->
    <!--    Win32 slash todo make this toggle space with quotes
    https://github.com/codeforwings/nuxt3-win32-posix-path/issues/3
     />-->
    <h1>Win32 to Win32 Slash</h1>
    <textarea className="area"
              v-model="sWin32ToSlash"
    />
    <textarea className="area"
              :value="sOutputWin32ToSlash"
    />

    <h1 Links></h1>
    <div>
      <a
        href="https://github.com/codeforwings/nuxt3-win32-posix-path"
        target="_blank"
      >github repo</a>
    </div>
  </div>
</template>
<script>
// import {pathPosixToWin32, pathWin32ToPosix} from "~/src/pathReplacement.mjs";
// import {win32ToWin32JS} from "~/src/win32ToWin32JS.mjs";
// import {win32ToWin32Slash, win32ToWin32WSL2} from "~/src/win32ToWin32WSL2.mjs";

//1. ~/lib
import {posixTests, win32Tests} from "##/lib/nodePathTestExamples.mjs";
/* from src - dont use until fixed... arg*/
import {
  pathPosixToWin32,
  pathWin32ToPosix,
  win32ToWin32JS,
  win32ToWin32Slash,
  win32ToWin32WSL2,
  win32ToCygwin
} from "##/src/index.mjs";
/* 2.2 from dist... */
// import {pathPosixToWin32, pathWin32ToPosix,win32ToWin32JS,win32ToWin32Slash,win32ToWin32WSL2} from "~/lib/dist/index.mjs";


//## not working for some reason
// import {posixTests, win32Tests} from "##/lib/nodePathTestExamples.mjs";
// import {pathPosixToWin32, pathWin32ToPosix,win32ToWin32JS,win32ToWin32Slash,win32ToWin32WSL2} from "##/lib/dist/index.mjs";
// import {pathPosixToWin32, pathWin32ToPosix,win32ToWin32JS,win32ToWin32Slash,win32ToWin32WSL2} from "##/lib/dist/index.mjs";
export default {
  name: 'app',
  mounted() {

  },
  data() {
    return {
      sInputWin32: win32Tests.map(val => val.input).join('\n'),
      sInputPosix: posixTests.map(val => val.input).join('\n'),

      //i believe this is the win32js
      sInputWin32Normal: [
        "C:\\Users\\Public\\Documents",
        "C:\\\\Users\\\\Public\\\\Documents",
        "C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md",
      ].join('\n'),
      /* */
      sWin32ToWsl: [
        "C:\\Users\\Public\\Documents",
        "C:\\\\Users\\\\Public\\\\Documents",
      ].join('\n'),
      sWin32ToCygwin: [
        `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"`,
        `C:\\progra~1\\PowerShell\\7\\pwsh.exe`,
        `C:\\cygwin64\\bin\\bash.exe`,
        //try appdata / localappdata
      ].join('\n'),
      sWin32ToSlash:
        [
          "C:\\Users\\Public\\Documents",
          // "C:\\\\Users\\\\Public\\\\Documents",
          // "C:\\Users\\Public\\temp spaces\\a\\b c\\d",
          `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"`,
          `C:\\progra~1\\PowerShell\\7\\pwsh.exe`,
          `C:\\cygwin64\\bin\\bash.exe`,
          `C:\\Windows\\System32\\cmd.exe`
        ].join('\n'),
    }
  },
  computed: {
    sOutputWin32ToPosix() {

      return this.sInputWin32.split('\n').map(val => {

        return pathWin32ToPosix(val);
      }).join('\n')
    },
    sOutputPosixToWin32() {
      return this.sInputPosix.split('\n').map(val => {
        return pathPosixToWin32(val);
      }).join('\n')
    },
    sOutputWin32Normal() {
      return this.sInputWin32Normal.split('\n').map(val => {
        return win32ToWin32JS(val);
      }).join('\n')
    },
    /* */
    sOutputWin32ToWsl() {
      return this.sWin32ToWsl.split('\n').map(val => {
        return win32ToWin32WSL2(val);
      }).join('\n')
    },
    sOutputWin32ToCygwin() {
      return this.sWin32ToCygwin.split('\n').map(val => {
        return win32ToCygwin(val);
      }).join('\n')
    },
    sOutputWin32ToSlash() {
      return this.sWin32ToSlash.split('\n').map(val => {
        return win32ToWin32Slash(val);
      }).join('\n')
    },
  },
}
</script>
<!--dark-theme css -->
<style>
.area {
  min-height: 100px;
  min-width: 500px;
}


:root {
  --bg-color: #333;
  --text-color: white;
}

.dark-theme {
  --bg-color: #333;
  --text-color: white;
}

.light-theme {
  --bg-color: white;
  --text-color: black;
}

body, input, textarea {
  background-color: var(--bg-color);
  color: var(--text-color);
}

h1, p {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  border: none;
  cursor: pointer;
}
</style>