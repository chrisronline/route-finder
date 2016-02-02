/**
 * Designed to match this pattern:
 *  
 * [RoutePrefix("myRoute")]
 */
const routePrefixRegExp = /\[RoutePrefix\("([^"]+)"\)/i
const deduceFromRoutePrefixAttr = (contents) => {
  const matches = routePrefixRegExp.exec(contents)
  if (matches && matches.length > 1) {
    return matches[1]
  }
  return null
}

/**
 * Designed to match this pattern:
 * 
 *  routes.MapRoute(
      "AthleteHighlight",
      "athlete/{athleteId}/highlights/{reelId}/v3/{action}",
      new
      {
        controller = "VideoPage",
        action = "AthleteContent",
      }
    );
 */
const routeConfigMapRouteRegExp = /routes.MapRoute\(\s*"([^"]+)",\s*"([^"]+)",[^"]+"([^"]+)",[^"]+"([^"]+)"/ig
const deduceFromMappedRoutes = (routeConfigContents) => {
  const results = [];
  let matches
  while ((matches = routeConfigMapRouteRegExp.exec(routeConfigContents)) !== null) {
    results.push({
      name: matches[1],
      path: matches[2],
      controller: matches[3],
      action: matches[4]
    })
  }
  // console.debug('deduceFromMappedRoutes()', results)
  return results
}

export default function getRoutePrefix(controllerContents, mappedRouteContents) {
  let prefix = deduceFromRoutePrefixAttr(controllerContents)
  if (prefix) {
    return prefix
  }
  
  const prefixes = []
  for (let contents of mappedRouteContents) {
    prefix = deduceFromMappedRoutes(contents)
    if (prefix.length) {
      prefixes.push(...prefix)
    }
  }
  
  return prefixes
}