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
import {pathWin32ToPosix} from "~/pathReplacement.mjs";
import {win32Tests} from "~/dev/nodePathTestExamples.mjs";

export default {
  name:'app',
  data() {
    return {
      sInputWin32: win32Tests.map(val => val.input).join('\n'),
      sInputPosix: win32Tests.map(val => val.expected).join('\n'),

    }
  },
  computed: {
    sOutputWin32ToPosix() {

      return this.sInputWin32.split('\n').map( val =>{

        return pathWin32ToPosix(val);
      }).join('\n')
    },
    sOutputPosixToWin32() {
      return this.sInputPosix
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
