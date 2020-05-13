export const titleSchema = {
  title1: {
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
