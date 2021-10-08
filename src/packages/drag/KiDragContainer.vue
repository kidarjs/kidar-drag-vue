<template>
  <div ref="dragContainer" style="position: relative;height: 100%;width: 100%;background-color: #f1f1f1;">
    <div v-for="(item, i) in items" :key="item.id" :dataset-drag-index="i"
         :style="`position: absolute;width:${item.width};height:${item.height};left:${item.left};top:${item.top};min-width:${item.minWidth};`">
      <div class="__drag-item" style="height: 100%;width: 100%;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);">
        <slot name="item" v-bind:item="item"></slot>
      </div>
      <button v-if="isCanDel" @click="deleteItem(i, item)" style="position: absolute;right: 4px;">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" fill="currentColor">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Drag from './drag'
export default {
  name: 'KiDragContainer',
  props: {
    editable: { type: Boolean, default: true },
    items: { type: Array, default: () => [] }
  },
  watch: {
    items: {
      handler: function (newV, oldV) {
        this.$emit('changed', newV)
      },
      deep: true
    },
    editable: function (newV) {
      newV ? this.active() : this.disable()
    }
  },
  data () {
    return {
      isCanDel: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.editable && this.active()
    })
  },
  beforeDestroy () {
    this.disable()
  },
  methods: {
    deleteItem (i, item) {
      this.$emit('delete', i, item)
    },
    updateItem (item) {
      let { width, height, left, top } = item.style
      let idx = item.getAttribute('dataset-drag-index')
      if (this.items[idx].width !== width
        || this.items[idx].height !== height
        || this.items[idx].left !== left
        || this.items[idx].top !== top) {
        this.items[idx].width = width
        this.items[idx].height = height
        this.items[idx].left = left
        this.items[idx].top = top
        this.$emit('changed', this.items)
      }

    },
    active () {
      Drag.active(this.$refs.dragContainer, this.updateItem)
      this.isCanDel = true
    },
    disable () {
      Drag.clear(this.$refs.dragContainer)
      this.isCanDel = false
    }
  }
}
</script>
