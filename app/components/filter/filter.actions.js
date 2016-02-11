export const SET_FILTER = 'SET_FILTER'
export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export const SET_TYPE = 'SET_TYPE'
export function setType(routeType) {
  return { type: SET_TYPE, routeType }
}

export const SET_CLUSTER = 'SET_CLUSTER'
export function setCluster(cluster) {
  return { type: SET_CLUSTER, cluster }
}