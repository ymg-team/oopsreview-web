export function epochToFormat(epoch=0, format='') {
  const date = new Date(epoch * 1000)

  switch(format) {
    case 'Y-M-D':
    default:
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }
}
