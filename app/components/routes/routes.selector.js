// https://github.com/rackt/reselect
import { createSelector } from 'reselect'

const routeListSelector = state => state.routes
const querySelector = state => state.filter.query

export const routesSelector = createSelector(
  routeListSelector,
  querySelector,
  (routes, query) => {
    return {
      trees: routes.trees,
      content: routes.content,
      routes: query ? routes.list.filter(r => {
        return r.route.includes(query) || r.path.includes(query) || r.path.includes(query)
      }) : routes.list
    }
  }
)