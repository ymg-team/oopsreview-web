import * as types from "../../vuex/types"

import request from "../../vuex/utils/api"
import { Context as ContextInterface } from "../../vuex/interfaces"

interface State {
  list: {[filter: string]: object},
  detail: {[filter: string]: object}
}

interface ParamsGetPost {
  filter: string,
  response: object
}

const initialState = {
  list: {},
  detail: {}
}

const getters = {}

const actions = {
  // request to api post list
  [types.GET_POSTS]: (context: ContextInterface, params: ParamsGetPost) => {
    request("get", "/api/posts/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw?limit=8").then(
      response => {
        context.commit(types.GET_POSTS, {
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
    {filter}: ParamsGetPost
  ) => {
    state.list[filter] = {loading: true}
  },

  // receive response post list
  [types.GET_POSTS]: (
    state: State = initialState,
    { filter, response }: ParamsGetPost
  ) => {
    state.list[filter] = Object.assign({}, {loading: false}, response)
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
