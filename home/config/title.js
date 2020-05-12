export const titleSchema = {
  title1: {
    files: [
      {
        title: '宽度',
        type: 'number',
        name: 'width'
      },
      {
        title: '高度',
        type: 'number',
        name: 'height'
      },
      {
        title: 'x轴坐标',
        type: 'number',
        name: 'x'
      },
      {
        title: 'y轴坐标',
        type: 'number',
        name: 'y'
      },
      {
        title: '名称',
        type: 'string',
        name: 'value'
      }
    ],
    models: {
      width: 200,
      height: 60,
      x: 0,
      y: 0,
      value: 'datav'
    }
  }
}
