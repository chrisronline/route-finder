/**
 * Designed to match this pattern:
 * 
 * [GET("feed/{type}-{relatedId}/followers")]
*/
const routeRegExp_AttributeRoutingWebMvc = /\[(POST|GET|ROUTE|DELETE|PUT)\("([^"]+)"\)/ig
const getRoutes_AttributeRoutingWebMvc = (contents) => {
  const results = []
  let matches
  while ((matches = routeRegExp_AttributeRoutingWebMvc.exec(contents)) !== null) {
    const suffix = matches[2].toLowerCase()
    const type = matches[1].toUpperCase()
    results.push({ suffix, type })
  }
  return results
}

/**
 * Designed to match this pattern:
 * `
 * [HttpPost]
   [Usage(App = "", Func = "", Op = "")]
   public async Task<ActionResult> Delete()
 * `
 */
const routeRegExp_SystemWebMVC = /\[Http(POST|GET|ROUTE)\]/ig
const routeNameRegEx_SystemWebMVC = /(\s{1}\w+\()/ig
const getRoutes_SystemWebMVC = (contents) => {
  const results = []
  let matches
  while ((matches = routeRegExp_SystemWebMVC.exec(contents)) !== null) {
    
    // Since the suffix isn't in the attribute, we need to read the method name
    // which acts as the suffix in the route - again, use a regular expression
    // but we need to start at the point of the last match to make sure we find
    // the right method
    routeNameRegEx_SystemWebMVC.lastIndex = routeRegExp_SystemWebMVC.lastIndex
    
    // Parse out the method name, which is the route name too
    const nameMatches = routeNameRegEx_SystemWebMVC.exec(contents)
    if (nameMatches == null || !nameMatches.length) {
      console.warn('Found [Http] attribute but unable to parse method name. This might mean the regular expression needs updating for a new case attributeResults=%o contents=%s', matches.slice(0, 2), contents)
      continue
    }
    
    // Take the last letter off, which is the trailing `(`
    // TODO: figure out how to do this in the regexp
    const suffix = nameMatches[1].substr(0, nameMatches[1].length -1).toLowerCase()
    const type = matches[1].toUpperCase()    
    results.push({ suffix, type })
  }
  return results
}

export default function getRouteSuffix(contents, routePrefix) {
  return getRoutes_SystemWebMVC(contents).concat(getRoutes_AttributeRoutingWebMvc(contents))
}