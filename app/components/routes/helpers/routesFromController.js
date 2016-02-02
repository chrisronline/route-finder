import getRoutePrefix from './routePrefix'
import getRouteSuffix from './routeSuffix'

const controllerNameRegEx = /Controllers\/([^\.]+).cs/i
export default async function getRoutesFromController(controllerPath, dispatch, mappedRouteContents, getContentsAsync) {
  const rawContent = await getContentsAsync('master', controllerPath)
  const rawFile = new Buffer(rawContent.content, 'base64').toString()
  
  const routePrefix = getRoutePrefix(rawFile, mappedRouteContents)
  const routeSuffix = getRouteSuffix(rawFile)
  
  const routeList = []
  for (let suffix of routeSuffix) {
    let route
   
    if (typeof routePrefix === 'string') {
      route = routePrefix + '/' + suffix.suffix
    }
    else {
      const controllerNameMatches = controllerNameRegEx.exec(controllerPath)
      const controllerName = controllerNameMatches && controllerNameMatches.length > 1
        ? controllerNameMatches[1]
        : null
      const correctRoutePrefix = routePrefix.find(prefix => (prefix.controller + 'Controller') === controllerName)
      if (correctRoutePrefix) {
        if (correctRoutePrefix.path.includes('{action}')) {
          route = correctRoutePrefix.path.replace('{action}', suffix.suffix)
        }
        else {
          route = correctRoutePrefix.path + '/' + suffix.suffix
        }
      }
      else {
        route = suffix.suffix
      }
    }
    
    if (!route) console.warn('No route found controller=%s prefix=%o suffix=%o', controllerPath, routePrefix, routeSuffix)
    if (!suffix.type) console.warn('No type found', suffix)
        
    routeList.push({
      route,
      type: suffix.type,
      path: controllerPath
    })
  }
   
  return routeList
}