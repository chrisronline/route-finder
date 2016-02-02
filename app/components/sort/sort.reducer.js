import {
  CHANGE_SORT,
  SortTypes
} from './sort.actions'

const defaultState = {
  key: null,
  dir: SortTypes.DESC
}

export default function sort(state = defaultState, action) {
  switch (action.type) {
    
    case CHANGE_SORT:
      let { key, dir } = action
      if (state.key === key) {
        dir = state.dir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
      }
      return Object.assign({}, state, { key, dir })

    default:
      return state
  }
}