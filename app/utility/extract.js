const routePrefixRegExp = /\[RoutePrefix\("([^"]+)"\)/i
const getRoutePrefix = (contents) => {
  const matches = routePrefixRegExp.exec(contents)
  return matches && matches.length > 1 ? matches[1] : null
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
      },
      new
      {
        athleteId = longIdConstraint,
        reelId = longIdConstraint,
      }
    );
 */
const routeConfigMapRouteRegExp = /routes.MapRoute\("([^"]+)","([^"]+)",new{controller="([^"]+)",action="([^";]+)"/ig
export const parseRoutePrefixesFromRouteConfig = (routeConfigContents) => {
  const noWhitespaceContents = routeConfigContents.replace(/\s+/g, '')
  const matches = [];
  let routeMatches
  while ((routeMatches = routeConfigMapRouteRegExp.exec(noWhitespaceContents)) !== null) {
    matches.push({
      name: routeMatches[1],
      path: routeMatches[2],
      controller: routeMatches[3],
      action: routeMatches[3]
    })
  }
  return matches
}

const method1RouteRegExp = /\[(POST|GET|ROUTE)\("([^"]+)"\)/ig
const getRoutesMethod1 = (contents, routePrefix, routeConfigPrefix, path) => {
  const matches = []
  let routeMatches
  while ((routeMatches = method1RouteRegExp.exec(contents)) !== null) {
    const route = (routePrefix || '') + '/' + routeMatches[2]
    const type = routeMatches[1]
    matches.push({ route, type, path })
  }
  return matches
}

/**
 * Designed to match this pattern:
 * `
 * [HttpPost]
   [Usage(App = "", Func = "", Op = "")]
   public async Task<ActionResult> Delete()
 * `
 */
const method2RouteRegExp = /\[Http(POST|GET|ROUTE)\]/ig
const method2RouteNameRegEx = /ActionResult>?\s*([^\(]+)\(/ig
const controllerNameRegEx = /Controllers\/([^\.]+).cs/i
const getRoutesMethod2 = (contents, routePrefix, routeConfigPrefix, path) => {
  const matches = []
  let routeMatches
  while ((routeMatches = method2RouteRegExp.exec(contents)) !== null) {
    // Grab the method name
    method2RouteNameRegEx.lastIndex = method2RouteRegExp.lastIndex
    const nameMatches = method2RouteNameRegEx.exec(contents)
    if (nameMatches == null || !nameMatches.length) {
      console.warn('Found [Http] attribute but unable to parse method name. This might mean the regular expression needs updating for a new case attributeResults=%o path=%s', routeMatches.slice(0, 2), path)
      continue
    }
    
    // If there is no prefix and the routeConfigPrefix contains this path
    let route
    if (!routePrefix) {
      const controllerName = execRegExp(controllerNameRegEx, path, 1)
      if (controllerName) {
        const associatedConfig = routeConfigPrefix.find(config => (config.controller + 'Controller') === controllerName)
        if (associatedConfig) {
          route = associatedConfig.path.replace('{action}', nameMatches[1].toLowerCase())
        }
      }
    }
    
    if (!route) {
      route = (routePrefix || '') + '/' + nameMatches[1].toLowerCase()
    }
        
    const type = routeMatches[1].toUpperCase()
    matches.push({ route, type, path })
  }
  return matches
}

const execRegExp = (regExp, str, index) => {
  const matches = regExp.exec(str)
  if (!matches || matches.length < index) return null
  return matches[index]
}

export default (path, contents, routeConfigPrefix) => {
  const noWhiteSpaceContents = contents.replace(/\s+/g, '')
  
  const routePrefix = getRoutePrefix(noWhiteSpaceContents)

  const routes1 = getRoutesMethod1(noWhiteSpaceContents, routePrefix, routeConfigPrefix, path)
  const routes2 = getRoutesMethod2(noWhiteSpaceContents, routePrefix, routeConfigPrefix, path)
  return routes1.concat(routes2)
}