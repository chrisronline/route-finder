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

  const selectFixStyle = {'paddingRight': 31}

  return (
    <article>
      <form className="ko-form l-form-grid--3">
        <div className="ko-form__item l-grid__item">
          <div className="ko-form__input-container--select">
            <select className="ko-form__input--select" style={selectFixStyle} onChange={(e) => setType(e.target.value)}>
              <option value="">Select a type</option>
              {uniqueTypes}
            </select>
          </div>
        </div>

        <div className="ko-form__item l-grid__item">
          <div className="ko-form__input-container--select">
            <select className="ko-form__input--select" style={selectFixStyle} onChange={(e) => setCluster(e.target.value)}>
              <option value="">Select a cluster</option>
              {uniqueClusters}
            </select>
         </div>
        </div>

        <div className="ko-form__item l-grid__item">
          <div className="ko-form__input-container--search">
            <input type="search" value={filter} placeholder="Find in path or route"
              className="ko-form__input" onChange={(e) => setFilter(e.target.value)}/>
          </div>
        </div>
      </form>
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