import { generateCustomUrl } from "../modules/cloudinary"

/**
 * created by yussan
 * created at 17/03/18 23.33
 */

export default (n) => {
    delete n.password
    return {
      fullname: n.fullname,
      username: n.username,
      avatar: {
        original: n.avatar,
        small: generateCustomUrl(n.avatar, 'w_200,c_scale')
      }
    }
}
