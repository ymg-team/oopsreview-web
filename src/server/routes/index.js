import posts from './posts'
import users from './users'
import auth from './auth'

export default (route) => {
  posts(route)
  // users(route)
  auth(route)
}