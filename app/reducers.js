import { combineReducers } from 'redux'
import filter from './components/filter/filter.reducer'
import routes from './components/routes/routes.reducer'
import sort from './components/sort/sort.reducer'

const rootReducer = combineReducers({
  filter,
  routes,
  sort
})

export default rootReducer