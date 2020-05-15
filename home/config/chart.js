export const chartSchema = {
  piechart1: {
    files: [
      {
        title: '宽高',
        type: 'size',
        name: 'size'
      },
      {
        title: 'xy坐标',
        type: 'position',
        name: 'position'
      },
      {
        title: '标题',
        type: 'string',
        name: 'titleText'
      },
      {
        title: '标题样式',
        type: 'style',
        name: 'titleStyle'
      },
      {
        title: '图例位置',
        type: 'style',
        name: 'legendPosition'
      },
      {
        title: '图例',
        type: 'array',
        name: 'legendData'
      },
      {
        title: '圆心',
        type: 'array',
        name: 'radius'
      },
      {
        title: '数据',
        type: 'array',
        name: 'legendData'
      }
    ],
    models: {
      // 常规配置
      width: 600,
      height: 400,
      x: 0,
      y: 0,
      // chart配置
      title: {
        text: '饼图1',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      legend: {
        left: 'right',
        top: 'bottom',
        orient: 'vertical',
        data: '类型1, 类型2, 类型3, 类型4',
        textStyle: {
          color: '#ddd'
        }
      },
      wradius: '50',
      nradius: '70',
      seriesData: '50, 100, 120, 200'
    }
  }
}
