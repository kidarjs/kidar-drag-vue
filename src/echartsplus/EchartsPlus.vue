<template>
  <div ref="EchartsEl" class="ki-echartsplus"></div>
</template>
<script>
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
  [TooltipComponent, LegendComponent, CanvasRenderer]
);
import PIE from './pie'
import { listenElResize, removeListenElResize } from '../utils/dom-resize'
import { mergeDeepRight } from 'ramda'
const PLUGINS = { pie: PIE }
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
  watch: {
    type: function (val) {
      if (PLUGINS[val]) {
        this.resetOption()
      } else {
        import(`./${val}.js`).then(res => {
          console.log(res)
          PLUGINS[val] = res.default
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
    this.chart && removeListenElResize(this.$refs.EchartsEl) && this.chart.dispose()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.EchartsEl)
      listenElResize(this.$refs.EchartsEl, () => this.chart.resize())
      this.resetOption()
    },
    resetOption () {
      const option = PLUGINS[this.type].resetOption(this.cols, this.data)
      this.chart.clear()
      this.chart.setOption(mergeDeepRight(option, this.option))
    }
  }
}
</script>

<style scoped>
  .ki-echartsplus {
    width: 100%;
    height: 100%;
  }
</style>