import * as echarts from 'echarts/core';
import {
  PieChart
} from 'echarts/charts';

echarts.use([PieChart])

export default {
  resetOption (cols, data) {
    const option = {
      legend: {
        data: cols.map(t => t.name)
      },
      series: [
        {
          type: 'pie',
          radius: [0, '45%'],
          data: data
        }
      ]
    }

    return option
  }
}
