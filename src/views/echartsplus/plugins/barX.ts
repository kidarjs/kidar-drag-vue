import { defineConfig } from 'kidar-vue-echarts'

export default defineConfig({
  name: 'barX',
  resetOption(cols, data) {
    return {
      yAxis: [{
        type: 'value'
      }],
      xAxis: [{
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