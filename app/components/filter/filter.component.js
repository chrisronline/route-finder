import React, { PropTypes } from 'react'

const optionsBuilder = (val, key) => <option key={key} value={val}>{val}</option>
const alphaSorter = (a, b) => {
  if (a === b) return 0
  return a > b ? 1 : -1
}
const FilterComponent = ({ filter, setFilter, routes, setType, setCluster }) => {
  const types = []
  const clusters = []

  routes.list.forEach(route => {
    types.push(route.type)
    clusters.push(route.cluster)
  })

  types.sort(alphaSorter)
  clusters.sort(alphaSorter)

  const uniqueTypes = [ ...new Set(types) ].map(optionsBuilder)
  const uniqueClusters = [ ...new Set(clusters) ].map(optionsBuilder)

  return (
    <article>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Select a type</option>
        {uniqueTypes}
      </select>
      <select onChange={(e) => setCluster(e.target.value)}>
        <option value="">Select a cluster</option>
        {uniqueClusters}
      </select>
      <input type="text" value={filter} placeholder="Find in path or route" onChange={(e) => setFilter(e.target.value)}/>
    </article>
  )
}

FilterComponent.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setCluster: PropTypes.func.isRequired,
}

export default FilterComponent