<template>
  <div id="app" class="h-full">
    <Navbar style="height: 77px" @themeChange="themeChange" />
    <main style="height: calc(100vh - 78px);">
      <RouterView />
    </main>
  </div>
</template>
<script>
import { defineComponent, provide, ref } from '@vue/composition-api'
import { GLOBAL_ISDARK } from './common/providekey'

export default defineComponent({
  setup () {
    const isDark = ref(false)
    const themeChange = (val) => {
      console.log(val)
      isDark.value = val
    }
    provide(GLOBAL_ISDARK, isDark)
    return {
      themeChange
    }
  },
})
</script>

<style>
  #app {
    min-height: 100vh;
  }
</style>