import Vue from 'vue'
import * as types from "../../vuex/types"

import request from "../../vuex/utils/api"
// import { Context as ContextInterface } from "../../vuex/interfaces"

interface State {
  list: { [filter: string]: any }
  detail: { [filter: string]: any }
}

interface ParamsGetPost {
  filter: string
  response: object
}

const initialState = {
  list: {},
  detail: {}
}

const getters = {
  // getters to get list news by filter
  [types.GET_POSTS]: (state: State) => (filter: string) => {
    let post = {}
    console.log(state.list.length)
    state.list[filter] || {}
  }
}

const actions = {
  // request to api post list
  [types.GET_POSTS]: ({ commit }: any, params: ParamsGetPost) => {
    request("get", "/api/posts/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw?limit=8").then(
      response => {
        commit(types.GET_POSTS, {
          response,
          filter: params.filter
        })
        
      }
    )
  }
}

const mutations = {
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
  }

}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
