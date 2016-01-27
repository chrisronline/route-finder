import { combineReducers } from 'redux'
import filter from './components/filter/filter.reducer'
import routes from './components/routes/routes.reducer'

const rootReducer = combineReducers({
  filter,
  routes
})

export default rootReducer