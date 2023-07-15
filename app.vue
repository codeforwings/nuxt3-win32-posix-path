<template>
  <div id="app">
      <!--    sOutputWin32ToPosix />-->
      <h1>Win32 To Posix</h1>
      <textarea
        class="area"
        v-model="sInputWin32"
      />

      <textarea      class="area"
          :value="sOutputWin32ToPosix"
      />
      <br/>
      <!--    sOutputPosixToWin32 />-->
      <h1>Posix to Win32</h1>
      <textarea      class="area"
          v-model="sInputPosix"
      />

      <textarea      class="area"
          :value="sOutputPosixToWin32"
      />

      <!--    Win32 Normalized />-->
      <h1>Win32 to Win32JS</h1>
      <textarea class="area"
        v-model="sInputWin32Normal"
      />
      <textarea class="area"
        :value="sOutputWin32Normal"
      />
      <!--    Win32 wsl />-->
      <h1>Win32 to Win32 WSL mnt</h1>
      <textarea class="area"
        v-model="sWin32ToWsl"
      />
      <textarea class="area"
        :value="sOutputWin32ToWsl"
      />
      <!--    Win32 slash />-->
      <h1>Win32 to Win32 Slash</h1>
      <textarea class="area"
        v-model="sWin32ToSlash"
      />
      <textarea class="area"
        :value="sOutputWin32ToSlash"
      />
<!--    todo cygwin "/cygdrive/c/" to c:/ -->
  </div>
</template>
<script>
// import {pathPosixToWin32, pathWin32ToPosix} from "~/src/pathReplacement.mjs";
// import {win32ToWin32JS} from "~/src/win32ToWin32JS.mjs";
// import {win32ToWin32Slash, win32ToWin32WSL2} from "~/src/win32ToWin32WSL2.mjs";

import {posixTests, win32Tests} from "~/lib/nodePathTestExamples.mjs";
// import {posixTests, win32Tests} from "##/lib/nodePathTestExamples.mjs";
// import {pathPosixToWin32, pathWin32ToPosix,win32ToWin32JS,win32ToWin32Slash,win32ToWin32WSL2} from "##/lib/dist/index.mjs";
import {pathPosixToWin32, pathWin32ToPosix,win32ToWin32JS,win32ToWin32Slash,win32ToWin32WSL2} from "##/lib/dist/index.mjs";
export default {
  name:'app',
  mounted(){

  },
  data() {
    return {
      sInputWin32: win32Tests.map(val => val.input).join('\n'),
      sInputPosix: posixTests.map(val => val.input).join('\n'),

      //i believe this is the win32js
      sInputWin32Normal:          [
              "C:\\Users\\Public\\Documents",
              "C:\\\\Users\\\\Public\\\\Documents",
              "C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md",
          ].join('\n'),
      /* */
      sWin32ToWsl:          [
              "C:\\Users\\Public\\Documents",
              "C:\\\\Users\\\\Public\\\\Documents",
          ].join('\n'),
      sWin32ToSlash:
          [
              "C:\\Users\\Public\\Documents",
              "C:\\\\Users\\\\Public\\\\Documents",
              "C:\\Users\\Public\\temp spaces\\a\\b c\\d"
          ].join('\n'),
    }
  },
  computed: {
    sOutputWin32ToPosix() {

      return this.sInputWin32.split('\n').map( val =>{

        return pathWin32ToPosix(val);
      }).join('\n')
    },
    sOutputPosixToWin32() {
      return this.sInputPosix.split('\n').map( val =>{
        return pathPosixToWin32(val);
      }).join('\n')
    },
    sOutputWin32Normal(){
      return this.sInputWin32Normal.split('\n').map( val =>{
        return win32ToWin32JS(val);
      }).join('\n')
    },
    /* */
    sOutputWin32ToWsl() {
      return this.sWin32ToWsl.split('\n').map( val =>{
        return win32ToWin32WSL2(val);
      }).join('\n')
    },
    sOutputWin32ToSlash(){
      return this.sWin32ToSlash.split('\n').map( val =>{
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

body,input, textarea {
  background-color: var(--bg-color);
  color: var(--text-color);
}

h1, p{
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