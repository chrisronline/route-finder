import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setFilter } from './filter.actions'
import FilterComponent from './filter.component'

class FilterContainer extends Component {
  render() {
    const { filter, setFilter } = this.props
    return (
      <FilterComponent filter={filter} setFilter={setFilter}/>
    )
  }
}

export default connect(
  state => ({ filter: state.filter.query }),
  dispatch => bindActionCreators({ setFilter }, dispatch)
)(FilterContainer)