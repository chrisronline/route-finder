import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadRoutes } from '../routes/routes.actions'
import RoutesComponent from '../routes/routes.component'
import FilterComponent from '../filter'
import { routesSelector } from './routes.selector'

class RoutesContainer extends Component {
  componentWillMount() {
    const { loadRoutes } = this.props
    
    loadRoutes()
  }
  
  render() {
    const { routes, trees, content } = this.props
    
    // `routes=null` indicates no routes have been loaded yet
    if (!routes) {
      const treeList = trees ? trees.map((t, key) => (<li key={key}>{t}</li>)) : null
      const contentList = content ? content.map((c, key) => (<li key={key}>{c}</li>)) : null
      
      return (
        <section className="home">
          <p>Loading...</p>
          <h3>Trees</h3>
          <ul>
            {treeList}
          </ul>
          <h3>Content</h3>
          <ul>
            {contentList}
          </ul>
        </section>
      )
    }
    
    return (
      <section className="home">
        <FilterComponent/>
        <RoutesComponent routes={routes}/>
      </section>
    )
  }
}
export default connect(
  routesSelector,
  dispatch => bindActionCreators({ loadRoutes }, dispatch)
)(RoutesContainer)