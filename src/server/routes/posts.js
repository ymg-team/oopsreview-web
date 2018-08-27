import * as apiPost from '../handlers/api/post'
import sealMiddleware from '../middlewares/seal'
import seal from '../middlewares/seal';

export default (route) => {
  route.get('/api/posts/:seal', sealMiddleware, apiPost.list)
  route.post('/api/post/create/:seal', sealMiddleware, apiPost.create)
  route.get('/api/post/:id/:seal', sealMiddleware, apiPost.detail)
  route.put('/api/post/:id/update/:seal', sealMiddleware, apiPost.update)
  route.post('/api/post/:id/delete/:seal', sealMiddleware, apiPost.deletePost)

  // test routes
  route.post('/api/post/test/upload-cloudinary', apiPost.testUploadCloudinary)
}
