---
# https://vitepress.dev/reference/default-theme-home-page
#layout: layoutB does nothing unless i override the default layout
---
<script setup>
import { ref } from 'vue'
// import HelloWorlds from  "../.vitepress/theme/custom/hello-world.vue'
// import HelloWorld from '../.vitepress/theme/custom/HelloWorld.vue'
// import HelloWorld from '../theme/custom/HelloWorld.vue'
// import HelloWorlds from './custom/HelloWorld.vue'
// import HelloWorlds from '../custom/HelloWorld.vue'
// import HelloWorlds from '../custom/HelloWorld.vue'
//wow okay this worked
// import HelloWorlds from "C:\\Users\\Jason\\WebstormProjects\\nuxt3-win32-posix-path\\docs\\.vitepress\\theme\\custom\\hello-world.vue"
// import HelloWorlds from "##/theme/custom/HelloWorld.vue"
// import HelloWorlds from "#theme/custom/HelloWorld.vue"
//why does it work now... wth, did i not import it properly before? the alias doesnt seem to work though
import HelloWorlds from "../.vitepress/theme/custom/hello-world.vue"
const count = ref(0)
</script>

## que
<hello-world/>

<HelloWorlds/>
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