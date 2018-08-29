import { hashPassword } from "./password"

/**
 * @description function to generate encrypt name 
 * @param {object} file file object
 * @return {string} name.ext
 */
export const encName = (file) => {
  const file_arr = file.name.split('.')
  const ext = file_arr[file_arr.length - 1]
  const name = hashPassword(file.name.replace(`.${ext}`, ''))
  const filename = (`${name}.${ext}`).toLowerCase()

  return filename
}
