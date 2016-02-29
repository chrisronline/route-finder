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

export const SET_CONTROLLER_COUNT = 'SET_CONTROLLER_COUNT'
export function setControllerCount(tree, count) {
  return { type: SET_CONTROLLER_COUNT, tree, count }
}

export const SET_REPO_COUNT = 'SET_REPO_COUNT'
export function setRepoCount(count) {
  return { type: SET_REPO_COUNT, count }
}

export const LOAD_ROUTES = 'LOAD_ROUTES'
const controllersPathRegExp = /.*\/Controllers\/.*.cs/
export function loadRoutes() {
  return async dispatch => {
    const org = 'hudl'

    let routes = loadRoutesFromCache() || []
    if (routes.length) {
      dispatch(routesLoaded(routes))
      return
    }

    const repos = (await getReposAsync(org)).filter(repo => repo.name.includes('hudl'))
    repos.sort((a, b) => {
      if (a.name === b.name) return 0
      return (a.name > b.name) ? 1 : -1
    })

    dispatch(setRepoCount(repos.length))

    for (let repo of repos) {
      const { name: repoName } = repo
      const { getTreeAsync, getContentsAsync } = repoMethodGenerator(org, repoName)

      dispatch(fetchTree(repoName))
      const tree = await getTreeAsync('master?recursive=1')
      const controllers = tree.filter(t => controllersPathRegExp.test(t.path))

      dispatch(setControllerCount(repoName, controllers.length))

      if (controllers.length === 0) {
        continue
      }

      const mappedRouteContents = await getAllMappedRouteFileContents(tree, getContentsAsync)
      for (let controller of controllers) {
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