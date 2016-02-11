import {
  SET_FILTER,
  SET_TYPE,
  SET_CLUSTER
} from './filter.actions'

const defaultState = {}

export default function filter(state = defaultState, action) {
  switch (action.type) {

    case SET_FILTER:
      return Object.assign({}, state, { query: action.filter })

    case SET_TYPE:
      return Object.assign({}, state, { type: action.routeType })

    case SET_CLUSTER:
      return Object.assign({}, state, { cluster: action.cluster })

    default:
      return state
  }
}