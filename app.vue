<template>
  <div>
<!--    <NuxtWelcome />-->
    <h1>Win32 To Posix</h1>
    <textarea
      v-model="sInputWin32"
    />
    <!--    <NuxtWelcome />-->
    <textarea
        :value="sOutputWin32ToPosix"
    />
    <br/>
    <h1>Posix to Win32</h1>
    <textarea
        v-model="sInputPosix"
    />
    <!--    <NuxtWelcome />-->
    <textarea
        :value="sOutputPosixToWin32"
    />
  </div>
</template>
<script>
export default {
  name:'app',
  data() {
    return {
      sInputWin32: "value",
      sInputPosix: "value",

    }
  },
  computed: {
    sOutputWin32ToPosix() {

      return this.sInputWin32.split('\n').map( val =>{

        return val;
      }).join('\n')
    },
    sOutputPosixToWin32() {
      return this.sInputPosix
    },
  },
}
</script>
