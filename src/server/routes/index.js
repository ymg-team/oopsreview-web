import posts from './posts'
import users from './users'
import auth from './auth'
import tag from './tag'

export default (route) => {
  posts(route)
  // users(route)
  auth(route)
  tag(route)
}
