import Vue from 'vue'
import * as types from "../../vuex/types"
import { objToQuery } from "string-manager"

import request from "../../vuex/utils/api"
// import { Context as ContextInterface } from "../../vuex/interfaces"

interface State {
  list: { [filter: string]: any }
  detail: { [filter: string]: any }
}

interface ParamsGetPost {
  filter: string,
  limit?: number,
  featured?: boolean,
  response: object
}

const initialState = {
  list: {},
  detail: {}
}

const getters = {
}

const actions = {
  // request to api post list
  [types.GET_POSTS]: ({ commit }: any, params: ParamsGetPost) => {

    // generate querystring
    if(!params.limit) params.limit = 8
    const query = objToQuery(params)
    
    request("get", `/api/posts/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw?${query}`).then(
      response => {
        commit(types.GET_POSTS, {
          response,
          filter: params.filter
        })
      }
    )
  },

  // request to api post detail
  [types.GET_POST]: ({ commit }: any, post_id: string) => {
    request("get", `/api/post/${post_id}/5aa4ac2b830a0aef88acdb5c`).then(
      response => {
        commit(types.GET_POST, {
          response,
          filter: post_id
        })
      }
    )
  }
}

const mutations = {
  // on receive post detail
  [types.GET_POST]: (
    state: State = initialState,
    {filter, response}
  ) => {
    let {detail} = state
    detail[filter] = response 
    detail[filter].loading = false

    state.detail = Object.assign({}, detail)
  },
  
  // on request post list
  [types.REQUEST_POSTS]: (
    state: State = initialState,
    { filter }: ParamsGetPost
  ) => {
    state.list[filter] = { loading: true }
  },

  // receive response post list
  [types.GET_POSTS]: (
    state: State = initialState,
    { filter, response }: ParamsGetPost
  ) => {
    let {list} = state
    list[filter] = response 
    list[filter].loading = false

    state.list = Object.assign({}, list)
  },

  // receive response loadmore post list
  [types.GET_MORE_POST]: (
    state: State = initialState,
    { filter, response }: ParamsGetPost
  ) => {

  }

}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
