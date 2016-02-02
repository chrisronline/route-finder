// https://github.com/rackt/reselect
import { createSelector } from 'reselect'
import { SortTypes } from '../sort/sort.actions'

const routeListSelector = state => state.routes
const querySelector = state => state.filter.query
const sortSelector = state => state.sort

export const routesSelector = createSelector(
  routeListSelector,
  querySelector,
  sortSelector,
  (routesObj, query, sort) => {
    let routes = routesObj.list
    
    const lQuery = query ? query.toLowerCase() : null
    if (lQuery) {
      routes = routes.filter(r => {
        return (r.route && r.route.toLowerCase().includes(lQuery))
          || (r.path && r.path.toLowerCase().includes(lQuery))
          || (r.cluster && r.cluster.toLowerCase().includes(lQuery))
      })
    }
    
    if (sort && sort.key) {
      // Somewhat inefficient but we need to ensure a sorting
      // change creates a new object reference to trigger
      // renders
      let routesCopy = routes.slice()
      routesCopy.sort((a, b) => {
        const aKey = a[sort.key]
        const bKey = b[sort.key]
        
        if (aKey === bKey) return 0
        if (sort.dir === SortTypes.DESC) {
          return aKey > bKey ? -1 : 1
        }
        return aKey > bKey ? 1 : -1
      })
      routes = routesCopy
    }
    
    return {
      trees: routesObj.trees,
      sortDir: sort ? sort.dir : null,
      routes
    }
  }
)