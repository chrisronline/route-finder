// https://github.com/rackt/reselect
import { createSelector } from 'reselect'
import { SortTypes } from '../sort/sort.actions'

const routeListSelector = state => state.routes
const filterSelector = state => state.filter
const sortSelector = state => state.sort

export const routesSelector = createSelector(
  routeListSelector,
  filterSelector,
  sortSelector,
  (routesObj, filter, sort) => {
    let routes = routesObj.list
    if (routes) {
      const { query, type, cluster } = filter
      const lQuery = query ? query.toLowerCase() : null
      const lType = type ? type.toLowerCase() : null
      const lCluster = cluster ? cluster.toLowerCase() : null

      // The order matters here - apply type and cluster filters first
      routes = routes
        .filter(route => {
          const passesType = !lType || route.type.toLowerCase() === lType
          const passesCluster = !lCluster || route.cluster.toLowerCase() === lCluster
          return passesType && passesCluster
        })
        .filter(route => {
          return !lQuery || (route.path.toLowerCase().includes(lQuery) || route.route.toLowerCase().includes(lQuery))
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
      reposTotal: routesObj.reposTotal,
      reposCount: routesObj.reposCount,
      sortDir: sort ? sort.dir : null,
      routes,
    }
  }
)