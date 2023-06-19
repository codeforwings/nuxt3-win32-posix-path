---
# https://vitepress.dev/reference/default-theme-home-page
#layout: layoutB does nothing unless i override the default layout
---
<script setup>
import { ref } from 'vue'
// import HelloWorld from '../.vitepress/theme/custom/HelloWorld.vue'
// import HelloWorld from '../theme/custom/HelloWorld.vue'
// import HelloWorld from './custom/HelloWorld.vue'
const count = ref(0)
</script>

## que
<hello-world/>
## Markdown Content


The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
# New Layout
* where's my custom tile