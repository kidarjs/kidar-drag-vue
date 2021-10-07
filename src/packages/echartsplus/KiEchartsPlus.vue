<template>
  <div ref="EchartsEl"></div>
</template>
<script>
import * as echarts from 'echarts'
import PIE from './plugins/pie'
import { domResize } from 'nkxrb-tools'
import { mergeDeepRight } from 'ramda'

export default {
  name: 'KiEchartsPlus',
  props: {
    type: { type: String, default: 'pie' },
    option: { type: Object, default: () => ({}) },
    cols: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] }
  },
  data () {
    return {
      chart: null
    }
  },
  plugins: {
    pie: PIE
  },
  watch: {
    type: function (val) {
      if (this.$options.plugins[val]) {
        this.resetOption()
      } else {
        import(/* @vite-ignore */`./plugins/${val}.js`).then(res => {
          this.$options.plugins[val] = res.default
          this.resetOption()
        }).catch(error => {
          throw new Error(`加载【${val}.js】文件失败：${error}`)
        })
      }
    },
    data: function () {
      this.resetOption()
    }
  },
  mounted () {
    this.$nextTick(() => this.init())
  },
  beforeDestroy () {
    this.chart && domResize.removeListenElResize(this.$refs.EchartsEl) && this.chart.dispose()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.EchartsEl)
      domResize.listenElResize(this.$refs.EchartsEl, () => this.chart.resize())
      this.resetOption()
    },
    resetOption () {
      const option = this.$options.plugins[this.type].resetOption(this.cols, this.data)
      this.chart.clear()
      this.chart.setOption(mergeDeepRight(option, this.option))
    }
  }
}
</script>
