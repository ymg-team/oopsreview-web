import * as types from "../../vuex/types"
import { objToQuery } from "string-manager"
import { deleteListById } from "../../vuex/utils/normalizers"

import request from "../../vuex/utils/api"
// import { Context as ContextInterface } from "../../vuex/interfaces"

interface State {
  list: { [filter: string]: any }
  detail: { [filter: string]: any }
  tags: { [filter: string]: any }
}

interface ParamsGetPost {
  filter: string
  limit?: number
  featured?: boolean
  response: any
  lastcreatedon?: number
}

const initialState = {
  list: {},
  detail: {},
  tags: {}
}

const getters = {}

const actions = {
  // delete post
  [types.DELETE_POST]: ({ commit }: any, post_id: string) => {
    commit(types.DELETE_POST, { post_id })

    // request to api
    // request("post", `/api/posts/${post_id}/delete/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw`).then(
    //   response => {

    //   }
    // )
  },

  // request to api post list
  [types.GET_POSTS]: ({ commit }: any, params: ParamsGetPost) => {
    commit(types.REQUEST_POSTS, { filter: params.filter })

    // generate querystring
    if (!params.limit) params.limit = 8
    const query = objToQuery(params)

    request("get", `/api/posts/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw?${query}`).then(
      response => {
        if (typeof params.lastcreatedon === "number") {
          // loadmore news
          commit(types.GET_MORE_POSTS, {
            response,
            filter: params.filter
          })
        } else {
          // get news
          commit(types.GET_POSTS, {
            response,
            filter: params.filter
          })
        }
      }
    )
  },

  // request to api post detail
  [types.GET_POST]: ({ commit }: any, post_id: string) => {
    commit(types.REQUEST_POSTS, { filter: post_id })
    request("get", `/api/post/${post_id}/5aa4ac2b830a0aef88acdb5c`).then(
      response => {
        commit(types.GET_POST, {
          response,
          filter: post_id
        })
      }
    )
  },

  // request tags from api
  [types.GET_TAG]: ({ commit }: any, name: string) => {
    request("get", `/api/tag/${name}/5aa4ac2b830a0aef88acdb5c`).then(
      response => {
        commit(types.GET_TAG, {
          response,
          filter: name
        })
      }
    )
  },

  // create / update post
  [types.SUBMIT_POST]: ({ commit }: any, params: object = {}) => {
    commit(types.REQUEST_SUBMIT_POST, {})
    const { id }: any = params
    let endpoint = id
      ? `/api/post/${id}/update/5aa4ac2b830a0aef88acdb5c`
      : `/api/post/create/5aa4ac2b830a0aef88acdb5c`
    let method = id ? "put" : "post"
    request(method, endpoint, params).then(response => {
      commit(types.GET_POST, {
        filter: "response",
        response
      })
    })
  }
}

const mutations = {
  // on delete post by id
  [types.DELETE_POST]: (state: State = initialState, payload) => {
    let { list } = state
    list = deleteListById(list, payload, payload.post_id)

    state.list = { ...list }
  },

  // on request submit post
  [types.REQUEST_SUBMIT_POST]: (state: State) => {
    let { detail } = state
    detail.response = {
      loading: true
    }

    state.detail = { ...detail }
  },

  // on receive tag
  [types.GET_TAG]: (state: State = initialState, { filter, response }) => {
    let { tags } = state
    tags[filter] = response.data

    state.tags = { ...tags }
  },

  // on receive post detail
  [types.GET_POST]: (state: State = initialState, { filter, response }) => {
    let { detail } = state
    detail[filter] = response.data
    detail[filter].loading = false

    state.detail = Object.assign({}, detail)
  },

  // on request post list
  [types.REQUEST_POSTS]: (
    state: State = initialState,
    { filter }: ParamsGetPost
  ) => {
    if (!state.list[filter]) state.list[filter] = {}
    state.list[filter].loading = true
  },

  // receive response post list
  [types.GET_POSTS]: (
    state: State = initialState,
    { filter, response }: ParamsGetPost
  ) => {
    let { list } = state
    list[filter] = response.data
    if (!response.data) {
      list[filter] = {}
      list[filter].status = response.status
    }
    list[filter].loading = false

    state.list = { ...list }
  },

  // receive response loadmore post list
  [types.GET_MORE_POSTS]: (
    state: State = initialState,
    { filter, response }: ParamsGetPost
  ) => {
    let { list } = state
    list[filter].status = response.status
    if (response.status === 200) {
      console.log(response)
      list[filter].result = list[filter].result.concat(response.data.result)
    }
    list[filter].loading = false

    state.list = Object.assign({}, list)
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
