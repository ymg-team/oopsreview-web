import * as apiTag from '../handlers/api/tag'
import sealMiddleware from '../middlewares/seal'

export default (route) => {
  route.get('/api/tag/:name/:seal', sealMiddleware, apiTag.detail)
}
