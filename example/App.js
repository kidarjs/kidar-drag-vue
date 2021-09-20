const template = `
<div>
  <h1>组件示例</h1>
  <div style="display: flex;flex-warp: warp;">
    <div style="border: 1px solid #187644; min-width: 350px; width: 25%; height: 350px;">
      <ki-echarts-plus :data="dataA"/>
    </div>

    <div style="border: 1px solid #187644; min-width: 350px; width: 25%; height: 350px;">
      <ki-drag style="width: 100px; height: 100px;background-color: red;">
        <h5>拖拽容器</h5>
        <span>我是一个可以随意拖动，放大缩小的容器</span>
      </ki-drag>
    </div>
  </div>
</div>
`

import { EchartsPlus, Drag } from '../lib/kidar-es.js'
window.Vue.use(EchartsPlus)
window.Vue.use(Drag)
export default {
  name: 'App',
  template: template,
  data () {
    return {
      userName: 'nkxrb',
      dataA: [
        { name: 'ss', value: 123 },
        { name: 'dd', value: 45 },
        { name: 'aa', value: 103 }
      ]
    }
  }
}