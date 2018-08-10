import * as sitemapHandler from "../handlers/sitemap/index"
import sealMiddleware from '../middlewares/seal'
import seal from '../middlewares/seal';

export default (route) => {
  route.get('/sitemap/tags', sitemapHandler.getSitemapTags)
  route.get('/sitemap/users', sitemapHandler.getSitemapUsers)
  route.get('/sitemap/posts', sitemapHandler.getSitemapPosts)
}


