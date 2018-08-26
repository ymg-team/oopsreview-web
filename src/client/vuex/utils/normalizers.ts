/**
 * @description function to handle update list by id 
 * @param {object} state vuex state
 * @param {object} payload from vuex
 * @param {number} id 
 * @param {function} callback if found data
 */
export function updateListById(state, payload, id, callback) {

  const keys = Object.keys(state)

  keys.map((n) => {
    if (state[n].result) {
      state[n].result.map(m => {
        if (m._id === id) return callback(payload, m)
      })
    }
  })
}


export function deleteListById(state, payload, id) {

  const keys = Object.keys(state)

  keys.map((n) => {
    if (state[n].result) {
      state[n].result.map((m, key) => {
        if (m._id === id) {
          if(payload.status) {
            if(payload.status === 200) {
              delete state[n].result[key]
            } else {
              m.is_deleted = false
            }
          } else {
            m.is_deleted = true
          }
        }
      })
    }
  })

  return {...state}
}
