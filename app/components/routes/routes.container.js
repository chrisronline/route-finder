import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadRoutes } from './routes.actions'
import { changeSort } from '../sort/sort.actions'
import RoutesComponent from './routes.component'
import FilterComponent from '../filter'
import RoutesLoading from './routes.loading'
import { routesSelector } from './routes.selector'

class RoutesContainer extends Component {
  componentWillMount() {
    const { loadRoutes } = this.props

    loadRoutes()
  }

  render() {
    const { routes, changeSort, sortDir, trees, reposTotal, reposCount } = this.props

    // `routes=null` indicates no routes have been loaded yet
    if (!routes) {
      if (trees && reposCount && reposTotal) {
        return (<RoutesLoading trees={trees} reposCount={reposCount} reposTotal={reposTotal}/>)
      }
      return false
    }

    return (
      <section className="home">

        <header className="site-header" role="header">
          <div className="l-content">
            <h1 className="site-logo__h">Route Finder</h1>
            <p className="ko-text--lg ko-spacer--xsm">Find what you want you want to find it</p>
          </div>
          <FilterComponent/>
        </header>


        <div className="l-content ko-spacer--xxlg--top">
          <RoutesComponent routes={routes} changeSort={changeSort} sortDir={sortDir}/>
        </div>
      </section>
    )
  }
}
export default connect(
  routesSelector,
  dispatch => bindActionCreators({ loadRoutes, changeSort }, dispatch)
)(RoutesContainer)