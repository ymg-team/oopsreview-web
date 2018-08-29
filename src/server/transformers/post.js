import { toSlug } from "string-manager"
import { generateCustomUrl } from "../modules/cloudinary"

/**
 * created by yussan
 * created at 17/03/18 23.33
 * created using WebStorm
 */

const DEFAULT_THUMB = 'https://res.cloudinary.com/dhjkktmal/image/upload/v1529931141/oopsreview/2018/default-thumb.png'

export default (n) => {
    delete n.user_id

    return {
      _id: n._id,
      title: n.title,
      nospace_title: toSlug(n.title), 
      created_on: n.created_on,
      updated_on: n.updated_on,
      content: n.content,
      views: n.views || 0,
      comments: n.comments || 0,
      tags: n.tags ? n.tags.split(',') : [],
      app: n.app && n.app.length > 0 ? n.app[0] : {},
      draft: n.draft == 'true' || n.draft == true,
      image: {
        original: n.image || DEFAULT_THUMB,
        600: n.image ? generateCustomUrl(n.image, 'w_600,c_scale') : generateCustomUrl(DEFAULT_THUMB, 'w_600,c_scale'),
        small: n.image ? generateCustomUrl(n.image, 'w_200,c_scale') : generateCustomUrl(DEFAULT_THUMB, 'w_200,c_scale')
      }
    }
}
