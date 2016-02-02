import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadRoutes } from '../routes/routes.actions'
import { changeSort } from '../sort/sort.actions'
import RoutesComponent from '../routes/routes.component'
import FilterComponent from '../filter'
import { routesSelector } from './routes.selector'

class RoutesContainer extends Component {
  componentWillMount() {
    const { loadRoutes } = this.props
    
    loadRoutes()
  }
  
  render() {
    const { routes, changeSort, sortDir, trees } = this.props
        
    // `routes=null` indicates no routes have been loaded yet
    if (!routes) {
      const treeList = trees
        ? trees.map((tree, key) => {
            let files
            if (tree.files && tree.files.length) {
              const list = tree.files.map((file, key) => {
                return (<li key={key}>{file}</li>)
              })
              files = (
                <ul>
                  {list}
                </ul>
              )
            }
            return (
              <li key={key}>
                {tree.name}
                {files}
              </li>
            )
          }) 
        : null
      
      return (
        <section className="home">
          <p>Loading...</p>
          <h3>Trees</h3>
          <ul>
            {treeList}
          </ul>
        </section>
      )
    }
    
    return (
      <section className="home">
        <FilterComponent/>
        <RoutesComponent routes={routes} changeSort={changeSort} sortDir={sortDir}/>
      </section>
    )
  }
}
export default connect(
  routesSelector,
  dispatch => bindActionCreators({ loadRoutes, changeSort }, dispatch)
)(RoutesContainer)