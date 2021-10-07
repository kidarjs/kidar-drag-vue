<template>
  <div>
    <div class="drag-tools">
      <button @click="add">新增</button>
      <button @click="active">启动编辑</button>
      <button @click="disable">禁止编辑</button>
    </div>
    <div class="mt-4 mb-4 px-4">
      <p>
        注意：事件机制，盒子在启动编辑的状态下，内部的点击事件会被屏蔽，只有禁止编辑后，用户在盒子内部定义的事件才会被触发
      </p>
    </div>
    <ki-drag-container :editable="editable" :items="items" @changed="dragChange" @delete="deleteCard" style="height: 600px;">
      <template v-slot:item="scoped">
        <div :style="`background-color: ${scoped.item.color};color:#ffffff;`" class="card-item">
          <h5>盒子ID: {{scoped.item.id}}</h5>
          <a href="https://www.baidu.com" target="_blank" class="text-blue-400">标签默认事件测试</a>
          <br />
          <button class="px-3 bg-gray-200 text-black" @click="testBtn">vue自定义事件测试</button>
        </div>
      </template>
    </ki-drag-container>
  </div>
</template>
<script>
import { nanoid } from 'nanoid'

const colors = [
  "#199999",
  "#1890ff",
  "#1456aa",
  "#aa90ff",
  "#ff90ff",
  "#cd7777",
  "#ffee27",
  "#23e0ff",
  "#ff7700"
]

export default {
  data () {
    return {
      editable: true,
      items: []
    }
  },
  created () {
    this.items = JSON.parse(localStorage.getItem('KI_DRAG_ITEMS') || "[]")
  },
  methods: {
    dragChange () {
      localStorage.setItem('KI_DRAG_ITEMS', JSON.stringify(this.items))
    },
    add () {
      let item = {
        id: nanoid(),
        width: '50px',
        height: '50px',
        color: colors[Math.ceil(Math.random() * 8)]
      }
      this.items.push(item)
    },
    deleteCard (i, item) {
      this.items.splice(i, 1)
    },
    active () {
      this.editable = true
    },
    disable () {
      this.editable = false
    },
    testBtn () {
      console.log('vue自定义事件测试')
    }
  }
}
</script>

<style scoped>
  .card-item {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 6px;
    padding: 12px;
  }
  .card-item:hover {
    box-shadow: 0 0 10px 0px #666666;
  }
  .drag-tools {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #999999;
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