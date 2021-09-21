<template>
  <div style="position: absolute;">
    <div class="ki-drag-container">
      <slot />
    </div>
  </div>
</template>

<script>
import Drag from './drag.ts'
export default {
  name: 'KiDrag',
  mounted () {
    new Drag(this.$el)
  }
}
</script>

<style lang="scss" scoped>
  .ki-drag-container {
    box-sizing: border-box;
    &:hover {
      box-shadow: 0 2px 15px 0 #666;
    }
  }
</style>
