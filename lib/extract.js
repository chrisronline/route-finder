const routePrefixRegExp = /\[RoutePrefix\("([^"]+)"\)/i
const getRoutePrefix = (contents) => {
  const routePrefixMatches = routePrefixRegExp.exec(contents)
  if (routePrefixMatches && routePrefixMatches.length > 1) {
    return routePrefixMatches[1]
  }
  return null
}

const routeRegExp = /\[(POST|GET|ROUTE)\("([^"]+)"\)/ig
const getRoutes = (contents, routePrefix) => {
  const matches = []
  let routeMatches
  while ((routeMatches = routeRegExp.exec(contents)) !== null) {
    const route = (routePrefix || '') + '/' + routeMatches[2]
    const type = routeMatches[1]
    matches.push({ route, type })
  }
  return matches
}

export default (contents) => {
  const noWhiteSpaceContents = contents.replace(/\s+/g, '')
  // Find the [RoutePrefix] if it exists
  const routePrefix = getRoutePrefix(noWhiteSpaceContents)

  const routes = getRoutes(noWhiteSpaceContents, routePrefix)
  return routes
}