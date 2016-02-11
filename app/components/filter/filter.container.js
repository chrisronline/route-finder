import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setFilter, setType, setCluster } from './filter.actions'
import FilterComponent from './filter.component'

class FilterContainer extends Component {
  render() {
    return (
      <FilterComponent {... this.props}/>
    )
  }
}

export default connect(
  state => ({ filter: state.filter.query, routes: state.routes }),
  dispatch => bindActionCreators({ setFilter, setType, setCluster }, dispatch)
)(FilterContainer)