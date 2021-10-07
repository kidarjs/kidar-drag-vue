<template>
  <div>
    <div class="drag-tools">
      <button @click="add()">新增</button>
      <button @click="active">启动编辑</button>
      <button @click="disable">禁止编辑</button>
    </div>
    <ki-drag-container :items="items" @changed="dragChange" style="height: 600px;">
      <template v-slot:item="scoped">
        <h5>托转ssssssss asdssasd sssss aasssssa sdsasdsssssssssssssssssssssssssssssssssss</h5>
        <a href="https://www.baidu.com" target="_blank">baidu{{scoped.item.id}}</a>
      </template>
    </ki-drag-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [{
        id: 's45',
        width: 200,
        height: 100
      }]
    }
  },
  created () {

  },
  methods: {
    dragChange () {
      console.log(this.items[0])
    },
    add () {

    },
    active () {

    },
    disable () {

    },
  }
}
</script>

<style scoped>
  .__drag-container {
    color: currentColor;
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