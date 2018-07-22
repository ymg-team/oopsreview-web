import * as FeedHandler from "../handlers/feed/index"

export default (route) => {
  route.get('/feed', FeedHandler.getFeed)
}
