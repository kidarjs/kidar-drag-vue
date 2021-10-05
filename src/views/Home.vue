<template>
  <div>
    <ki-drag-container :items="items" @changed="dragChange">
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
    }
  }
}
</script>