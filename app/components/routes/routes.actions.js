import { getReposAsync, repoMethodGenerator } from '../../utility/github'
import extract, { parseRoutePrefixesFromRouteConfig } from '../../utility/extract'

const routeConfigPathRegExp = /.*\RouteConfig.cs/
const controllersPathRegExp = /.*\/Controllers\/.*.cs/
const repoWhitelist = [
  'hudl-profiles',
  // 'hudl-kickoff'
]

export const ROUTES_LOADED = 'ROUTES_LOADED'
export function routesLoaded(routes) {
  return { type: ROUTES_LOADED, routes }
}

export const FETCH_TREE = 'FETCH_TREE'
export function fetchTree(tree) {
  return { type: FETCH_TREE, tree }
}

export const FETCH_CONTENT = 'FETCH_CONTENT'
export function fetchContent(path) {
  return { type: FETCH_CONTENT, path }
}

export const LOAD_ROUTES = 'LOAD_ROUTES'
export function loadRoutes() {
  const routes = []
  return async dispatch => {
    const repos = await getReposAsync()
    const hudlRepos = repos.filter(repo => repo.owner.login === 'hudl')
      // .filter(repo => repoWhitelist.includes(repo.name))

    for (let hudlRepo of hudlRepos) {
      const { getTreeAsync, getContentsAsync } = repoMethodGenerator('hudl', hudlRepo.name)
      dispatch(fetchTree(hudlRepo.name))
      const tree = await getTreeAsync('master?recursive=1')
      const controllers = tree.filter(t => controllersPathRegExp.test(t.path))
      
      if (controllers.length === 0) {
        continue
      }
      
      let routeConfig = tree.find(t => routeConfigPathRegExp.test(t.path))
      if (routeConfig) {
        let routeRawContent = await getContentsAsync('master', routeConfig.path)
        routeConfig = parseRoutePrefixesFromRouteConfig(new Buffer(routeRawContent.content, 'base64').toString())
      }
            
      for (let controller of controllers) {
        dispatch(fetchContent(controller.path))
        const rawContent = await getContentsAsync('master', controller.path)
        const rawFile = new Buffer(rawContent.content, 'base64').toString()
        const controllerRoutes = extract(controller.path, rawFile, routeConfig).map(route => {
          return Object.assign({}, route, { cluster: hudlRepo.name })
        })
        routes.push(...controllerRoutes)
      }
    }
    
    dispatch(routesLoaded(routes))
  }
}