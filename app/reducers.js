import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import filter from './components/filter/filter.reducer'
import routes from './components/routes/routes.reducer'
import sort from './components/sort/sort.reducer'
import token from './components/token/token.reducer'
import orgs from './components/orgs/orgs.reducer'

const rootReducer = combineReducers({
  filter,
  routes,
  sort,
  token,
  orgs,
  form
})

export default rootReducer