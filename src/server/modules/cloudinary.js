import cloudinary from "cloudinary"

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * @description function to generate custom url param
 * @param {string} url
 * @param {string} arg based on cloudinary docs
 * @see  https://cloudinary.com/cookbook/resize_an_image
 */
export function generateCustomUrl(url, arg) {
  return url.replace(/upload.*oopsreview/, `upload/${arg}/oopsreview`)
}

/**
 * @description function to upload image to cloudinary directory
 * @param {object} file file object from input type file
 * @param {string} dir directory target
 */
export function upload(file, target, callback) {
  cloudinary.v2.uploader.upload(
    file,
    { use_filename: true, public_id: target },
    (err, result) => {
      if (err) console.log("Cloudinary error", e)
      console.log("Cloudinary success", result)
      callback(err, result)
    }
  )
}
