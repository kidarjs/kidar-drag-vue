import { defineConfig } from 'kidar-vue-echarts'

export default defineConfig({
  name: 'barY',
  resetOption(cols, data) {
    return {
      xAxis: [{
        type: 'value'
      }],
      yAxis: [{
        type: 'category',
        data: data.map(t => t.name)
      }],
      series: [
        {
          type: 'bar',
          data: data
        }
      ]
    }
  }
})