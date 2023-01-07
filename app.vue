<template>
  <div>
<!--    <NuxtWelcome />-->
    <h1>Win32 To Posix</h1>
    <textarea
      class="area"
      v-model="sInputWin32"
    />
    <!--    <NuxtWelcome />-->
    <textarea      class="area"
        :value="sOutputWin32ToPosix"
    />
    <br/>
    <h1>Posix to Win32</h1>
    <textarea      class="area"
        v-model="sInputPosix"
    />
    <!--    <NuxtWelcome />-->
    <textarea      class="area"
        :value="sOutputPosixToWin32"
    />
  </div>
</template>
<script>
import {pathPosixToWin32, pathWin32ToPosix} from "~/pathReplacement.mjs";
import {posixTests, win32Tests} from "~/dev/nodePathTestExamples.mjs";

export default {
  name:'app',
  data() {
    return {
      sInputWin32: win32Tests.map(val => val.input).join('\n'),
      sInputPosix: posixTests.map(val => val.input).join('\n'),

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
  },
}
</script>
<style>
  .area {
    min-height: 500px;
    min-width: 500px;
  }
</style>
