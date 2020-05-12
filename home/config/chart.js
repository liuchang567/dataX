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
        title: '标题颜色',
        type: 'color',
        name: 'titlecolor'
      },
      {
        title: '标题大小',
        type: 'number',
        name: 'titleSize'
      },
      {
        title: '标题位置',
        type: 'number',
        name: 'titleAlign'
      },
      {
        title: '图例',
        type: 'array',
        name: 'legend'
      },
      {
        title: '数据',
        type: 'array',
        name: 'seriesData'
      }
    ],
    models: {
      width: 600,
      height: 400,
      x: 0,
      y: 0,
      title: {
        text: '饼图1',
        left: 'center',
        textStyle: {
          color: '#ddd',
          fontSize: 14
        }
      },
      legend: '类型1, 类型2, 类型3, 类型4, 类型5',
      seriesData: '50, 100, 120, 200, 300'
    }
  }
}
