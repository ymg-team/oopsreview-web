/**
 * @description function to generate custom url param
 * @param {sring} url 
 * @param {string} arg based on cloudinary docs
 * @see  https://cloudinary.com/cookbook/resize_an_image
 */
export function generateCustomUrl(url, arg) {
  return url.replace(/upload.*oopsreview/, `upload/${arg}/oopsreview` )
}
