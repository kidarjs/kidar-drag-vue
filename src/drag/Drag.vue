<template>
  <div style="position: absolute;">
    <slot />
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
