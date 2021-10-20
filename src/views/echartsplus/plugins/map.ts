import { defineConfig } from 'kidar-vue-echarts'

export default defineConfig({
  name: 'map',
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
          type: 'map',
          map: 'HK',
          data: data
        }
      ]
    }
  }
})