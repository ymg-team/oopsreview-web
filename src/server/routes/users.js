import * as apiUser from '../handlers/api/user'
import sealMiddleware from '../middlewares/seal'

export default (route) => {
  route.get('/api/user/:username/:seal', apiUser.getUser)
}
