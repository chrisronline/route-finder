import {
  ROUTES_LOADED,
  FETCH_TREE,
  FETCH_CONTENT
} from './routes.actions'

const defaultState = {
  list: null,
  trees: null
}


export default function routes(state = defaultState, action) {
  switch (action.type) {
    
    case FETCH_CONTENT:
      return Object.assign({}, state, {
        trees: state.trees.map(tree => {
          if (tree.name === action.tree) {
            const files = (tree.files || [])
            files.push(action.path)
            return Object.assign({}, tree, { files })
          }
          return tree
        })
      })
      
    case FETCH_TREE:
      return Object.assign({}, state, {
        trees: (state.trees || []).concat([{ name: action.tree }])
      })
    
    case ROUTES_LOADED:
      return Object.assign({}, state, { list: action.routes })

    default:
      return state
  }
}