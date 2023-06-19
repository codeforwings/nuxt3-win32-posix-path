<script setup lang="js">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
<div>
  The count is: {{ count }}<br/>
<button class="button" @click="count++">Increment</button>
</div>

</template>

<!--i think it said avoid this scoped-->
<style scoped>
  .button {
    color: blue;
    font-weight: bold;
  }
</style>