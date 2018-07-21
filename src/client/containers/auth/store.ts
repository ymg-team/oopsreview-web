import Vue from "vue"
import request from "../../vuex/utils/api"
import * as TYPES from "../../vuex/types"

const initialState = {
  loading: false,
  response: {}
}

const getters = {
  loginStatus: state => {
    return state.auth
  }
}

interface InitialState {
  loading: boolean
  response: object
}

interface LoginPayload {
  username: string
  password: string
}

const actions = {
  /**
   * @description function to login ans save session
   * @param {string} payload.username 
   * @param {string} payload.password
   */
  [TYPES.LOGIN]: ({ commit }: any, payload: LoginPayload) => {
    commit(TYPES.LOGIN)
    // request to login
    request("post", "/api/login", payload).then(response => {
      commit(TYPES.LOGIN, response)
    })
  },

  /**
   * @description function to logout and destory session
   */
  [TYPES.LOGOUT]: ({ commit }: any) => {
    request("post", "/api/logout").then(response => {
      commit(TYPES.LOGOUT, response)
    })
  }
}

const mutations = {
  [TYPES.LOGIN]: (state: InitialState = initialState, payload: any) => {
    if (!payload) {
      state.loading = true
    } else {
      state.loading = false
      state.response = payload
    }
  },

  [TYPES.LOGOUT]: (state: InitialState = initialState, payload: any) => {
    console.log('logout muttation...')
    state.loading = false
      state.response = payload
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}
