import {
  ROUTES_LOADED,
  FETCH_TREE,
  FETCH_CONTENT
} from './routes.actions'

const defaultState = {
  list: null,
  trees: null,
  content: null
}

export default function routes(state = defaultState, action) {

  switch (action.type) {
    
    case FETCH_CONTENT:
      return Object.assign({}, state, { content: (state.content || []).concat(action.path) })
      
    case FETCH_TREE:
      return Object.assign({}, state, { trees: (state.trees || []).concat(action.tree) })
    
    case ROUTES_LOADED:
      return Object.assign({}, state, { list: action.routes })

    default:
      return state
  }
}