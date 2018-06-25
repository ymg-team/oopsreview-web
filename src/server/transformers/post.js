import { toSlug } from "string-manager"

/**
 * created by yussan
 * created at 17/03/18 23.33
 * created using WebStorm
 */

const DEFAULT_THUMB = 'https://res.cloudinary.com/dhjkktmal/image/upload/v1529931141/oopsreview/2018/default-thumb-oopsreview.png'
const DEFAULT_THUMB_SMALL = 'https://res.cloudinary.com/dhjkktmal/image/upload/w_200,c_scale/oopsreview/2018/default-thumb-oopsreview.png'

export default (n) => {
    delete n.user_id

    return {
      _id: n._id,
      title: n.title,
      nospace_title: toSlug(n.title), 
      created_on: n.created_on,
      updated_on: n.updated_on,
      views: n.views,
      content: n.content,
      tags: n.tags,
      image: {
        original: n.image || DEFAULT_THUMB,
        small: n.image ? n.image.replace(/upload.*oopsreview/, 'upload/w_200,c_scale/oopsreview' ) : DEFAULT_THUMB_SMALL
      }
    }
}
