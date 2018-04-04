import * as apiPost from '../handlers/api/post'
import sealMiddleware from '../middlewares/seal'

export default (route) => {
  route.get('/api/posts/:seal', sealMiddleware, apiPost.list)
  route.get('/api/post/:id/:seal', sealMiddleware, apiPost.detail)
}