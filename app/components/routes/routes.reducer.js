import {
  ROUTES_LOADED,
  FETCH_TREE,
  FETCH_CONTENT,
  SET_CONTROLLER_COUNT,
  SET_REPO_COUNT
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
            const count = (tree.controllersLoaded || 0) + 1
            return Object.assign({}, tree, { files, controllersLoaded: count })
          }
          return tree
        })
      })

    case FETCH_TREE:
      const reposCount = (state.reposCount || 0) + 1
      return Object.assign({}, state, {
        trees: (state.trees || []).concat([{ name: action.tree }]),
        reposCount
      })

    case SET_CONTROLLER_COUNT:
      return Object.assign({}, state, {
        trees: state.trees.map(tree => {
          if (tree.name === action.tree) {
            return Object.assign({}, tree, { controllersTotal: action.count })
          }
          return tree
        })
      })

    case SET_REPO_COUNT:
      return Object.assign({}, state, { reposTotal: action.count })

    case ROUTES_LOADED:
      return Object.assign({}, state, { list: action.routes })

    default:
      return state
  }
}