import React, { PropTypes } from 'react'



const FilterComponent = ({ filter, setFilter }) => {
  return (
    <article>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
    </article> 
  )
}

FilterComponent.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
}

export default FilterComponent