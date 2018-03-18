import * as apiUser from '../handlers/api/user'
import sealMiddleware from '../middlewares/seal'

export default (route) => {
  req.get('/user/:id/:seal', apiUser.getUser)
  req.get('/users/:seal', apiUser.getUser)
}
