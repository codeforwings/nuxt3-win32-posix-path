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
      <h1>Win32 to Win32JS mnt</h1>
      <textarea class="area"
        v-model="sInputWin32Normal"
      />
      <textarea class="area"
        :value="sOutputWin32Normal"
      />
  </div>
</template>
<script>
import {pathPosixToWin32, pathWin32ToPosix} from "~/pathReplacement.mjs";
import {posixTests, win32Tests} from "~/dev/nodePathTestExamples.mjs";
import {win32ToWin32JS} from "~/dev/win32ToWin32JS.mjs";
export default {
  name:'app',
  mounted(){

  },
  data() {
    return {
      sInputWin32: win32Tests.map(val => val.input).join('\n'),
      sInputPosix: posixTests.map(val => val.input).join('\n'),
      sInputWin32Normal:"C:\\Users\\Jason\\OneDrive\\Documents\\2022\\someMD.md",
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

  },
}
</script>
<style>
  .area {
    min-height: 500px;
    min-width: 500px;
  }
</style>
