import * as apiPost from '../handlers/api/post'
import sealMiddleware from '../middlewares/seal'
import seal from '../middlewares/seal';

export default (route) => {
  route.get('/api/posts/:seal', sealMiddleware, apiPost.list)
  route.post('/api/post/create/:seal', sealMiddleware, apiPost.create)
  route.get('/api/post/:id/:seal', sealMiddleware, apiPost.detail)
}
