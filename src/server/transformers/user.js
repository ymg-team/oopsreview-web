/**
 * created by yussan
 * created at 17/03/18 23.33
 * created using WebStorm
 */

export default (n) => {
    delete n.password
    return {
      fullname: n.fullname,
      username: n.username,
      avatar: n.avatar
    }
}
