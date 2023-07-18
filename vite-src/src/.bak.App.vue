<script setup>
import HelloWorld from './components/HelloWorld.vue'

import {posixTests, win32Tests} from "##/lib/nodePathTestExamples.mjs";
console.log(posixTests);
import {computed,defineOptions} from "vue";
import {ref} from "vue";
//old syntax? nice 3.3 only
defineOptions({
  data() {
    return {
      //may not work though...
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
      sWin32ToCygwin:[
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
    sOutputWin32ToCygwin() {
      return this.sWin32ToCygwin.split('\n').map( val =>{
        return win32ToCygwin(val);
      }).join('\n')
    },
    sOutputWin32ToSlash(){
      return this.sWin32ToSlash.split('\n').map( val =>{
        return win32ToWin32Slash(val);
      }).join('\n')
    },
  },
})



</script>

<!--<template>-->
<!--  <div>-->
<!--  msg {{sInputWin32}}-->
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
<!--  <HelloWorld msg="Vite + Vue" />-->
<!--</template>-->
<template>
  <div>
  msg {{sOutputWin32ToPosix}}
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
