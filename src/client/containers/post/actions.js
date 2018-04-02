import * as types from '../../vuex/types'

/**
 * function to request list post
 */
export function fetchPosts({ dispatch }, params) {
  dispatch(types.GET_POSTS, params)
}


/**
 * function to request detail post
 */
export function fetchPost({ dispatch }, params) {
  dispatch(types.GET_POST, params)
}
