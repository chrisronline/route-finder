import { getReposAsync, repoMethodGenerator } from '../../utility/github'
import { loadRoutesFromCache, saveRoutesToCache } from './helpers/cache'
import getAllMappedRouteFileContents from './helpers/mappedRoutes'
import getRoutesFromController from './helpers/routesFromController'

export const ROUTES_LOADED = 'ROUTES_LOADED'
export function routesLoaded(routes) {
  return { type: ROUTES_LOADED, routes }
}

export const FETCH_TREE = 'FETCH_TREE'
export function fetchTree(tree) {
  return { type: FETCH_TREE, tree }
}

export const FETCH_CONTENT = 'FETCH_CONTENT'
export function fetchContent(tree, path) {
  return { type: FETCH_CONTENT, path, tree }
}

export const LOAD_ROUTES = 'LOAD_ROUTES'
const controllersPathRegExp = /.*\/Controllers\/.*.cs/
const repoWhitelist = [ 'hudl' ]
export function loadRoutes() {
  return async dispatch => {
    const org = 'hudl'
    
    let routes = loadRoutesFromCache() || []
    if (routes.length) {
      dispatch(routesLoaded(routes))
      return
    }
        
    const repos = (await getOrgRepos(org)).filter(repo => repoWhitelist.includes(repo.name))
    repos.sort((a, b) => {
      if (a.name === b.name) return 0
      return (a.name > b.name) ? 1 : -1
    })

    for (let repo of repos) {
      const { name: repoName } = repo
      const { getTreeAsync, getContentsAsync } = repoMethodGenerator(org, repoName)
      
      dispatch(fetchTree(repoName))
      const tree = await getTreeAsync('master?recursive=1')
      const controllers = tree.filter(t => controllersPathRegExp.test(t.path))      
      if (controllers.length === 0) {
        continue
      }
      
      const mappedRouteContents = await getAllMappedRouteFileContents(tree, getContentsAsync)       
      for (let controller of controllers) {
        // if (controller.path.indexOf('CategoryController') === -1) {
        //   continue
        // }
        dispatch(fetchContent(repoName, controller.path))
        const controllerRoutes = await getRoutesFromController(
          controller.path, dispatch, mappedRouteContents, getContentsAsync)
        routes.push(...controllerRoutes.map(route => Object.assign({}, route, {
          cluster: repoName,
          pathUrl: 'http://github.com/' + org + '/' + repoName + '/blob/master/' + route.path
        })))
      }
    }
    
    saveRoutesToCache(routes)
    
    console.log('done')
    
    dispatch(routesLoaded(routes))
  }
}

const getOrgRepos = async (orgName) => {
  const repos = await getReposAsync()
  return repos.filter(repo => repo.owner.login === orgName)
}