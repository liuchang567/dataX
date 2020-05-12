export function forPageStyle (obj) {
  let style =''
  for (var key in obj) {
    if (key === 'width' || key === 'height') {
      style+= `${key}:${obj[key]}px;`
    } else {
      style+= `${key}:${obj[key]};`
    }
  }
  return style
}

export function forStyle (page, obj) {
  // const { widht, height } = page
  let style =''
  for (var key in obj) {
    if (key === 'width' || key === 'height') {
      // 容器大小
      style+= `${key}:${obj[key] / page[key]}%;`
    } else if (key === 'x' || key === 'y') {
      // 容器位置
      style+= `${key}:${obj[key]}px;`
    } else {
      style+= `${key}:${obj[key]};`
    }
  }
  return style
}