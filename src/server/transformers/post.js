/**
 * created by yussan
 * created at 17/03/18 23.33
 * created using WebStorm
 */

export default (n) => {
    delete n.user_id
    // return n
    return {
      _id: n._id,
      title: n.title,
      created_on: n.created_on,
      updated_on: n.updated_on,
      views: n.views,
      content: n.content,
      tags: n.tags
    }
}
