import * as types from '../../vuex/types'
import { Store } from '../../vuex/interfaces'

/**
 * function to request list post
 */
export function fetchPosts(store: Store, params: object) {
  store.dispatch(types.GET_POSTS, params)
}


/**
 * function to request detail post
 */
export function fetchPost(store: Store, params: object) {
  store.dispatch(types.GET_POST, params)
}
