export default {
  resetOption(cols, data) {
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
