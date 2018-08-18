/**
 * @description function to convert epoch to custom format date time
 * @param {number} epoch 
 * @param {string} format date time 
 */
export function epochToFormat(epoch=0, format='') {
  const date = new Date(epoch * 1000)

  switch(format) {
    case 'Y-M-D':
    default:
      return `${date.getFullYear()}-${String(`0${date.getMonth()}`).slice(-2)}-${String(`0${date.getDate()}`).slice(-2)}`
  }
}
