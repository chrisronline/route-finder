export const CHANGE_SORT = 'SORT'
export const SortTypes = { ASC: 'ASC', DESC: 'DESC' }
export function changeSort(key, dir) {
  return { type: CHANGE_SORT, key, dir }
}