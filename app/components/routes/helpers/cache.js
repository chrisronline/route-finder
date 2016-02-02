const cacheKey = 'RF::routes'

export const loadRoutesFromCache = () => {
  let routes
  const routesFromCache = localStorage.getItem(cacheKey)
  if (routesFromCache) {
    try {
      routes = JSON.parse(routesFromCache)
    }
    catch (e) {
      console.warn('Unable to parse route data into JSON', e)
    }
  }
  return routes
}

export const saveRoutesToCache = (routes) => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(routes))
  }
  catch (e) {
    console.warn('Unable to save route data to cache', e)
  }
}