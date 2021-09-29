<template>
  <div class="drag-container">
    <div class="drag-tools">
      <slot name="tools">
        <button @click="add()">新增</button>
        <button @click="active">启动编辑</button>
        <button @click="disable">禁止编辑</button>
      </slot>
    </div>
    <div ref="dragContainer" style="position: relative;height: 100%;">
      <div v-for="(item, i) in dragItems" :key="item.id" :style="`position: absolute;width:${item.initWidth|| 100}px;height:${item.initWidth||100}px;`">
        <button @click="deleteItem(i)">delete</button>
        <div class="drag-item">
          <slot name="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drag from './drag'
export default {
  data () {
    return {
      dragItems: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.active()
    })
  },
  beforeDestroy () {
    this.disable()
  },
  methods: {
    add (item = {}) {
      this.dragItems.push({
        id: this.dragItems.length,
        initWidth: item.initWidth,
        initHeight: item.initHeight
      })
    },
    deleteItem (i) {
      this.dragItems.splice(i, 1)
    },
    active () {
      Drag.active(this.$refs.dragContainer)
    },
    disable () {
      Drag.clear(this.$refs.dragContainer)
    }
  }
}
</script>

<style scoped>
  .drag-container {
    display: flex;
    flex-direction: column;
    background-color: #a0a0a0;
    height: 500px;
  }
  .drag-item {
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .drag-tools {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #999999;
    border-top: 1px solid #999999;
    text-align: center;
  }
  .drag-tools button {
    border: 1px solid #999999;
    padding: 0 4px;
    margin: 0 12px;
  }
  .drag-tools button:hover {
    background-color: antiquewhite;
  }
</style>