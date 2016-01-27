import {
  SET_FILTER,
} from './filter.actions'

const defaultState = {}

export default function filter(state = defaultState, action) {
  switch (action.type) {
    
    case SET_FILTER:
      return Object.assign({}, state, {
        query: action.filter
      })

    default:
      return state
  }
}