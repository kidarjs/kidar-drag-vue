export default {
  resetOption (cols, data) {
    const option = {
      xAxis: {
        type: 'category',
        data: data.map(t => t.name)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data,
          type: 'line'
        }
      ]
    }

    return option
  }
}
