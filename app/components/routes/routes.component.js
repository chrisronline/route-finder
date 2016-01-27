import React, { Component, PropTypes } from 'react'
import FixedDataTable, { Table, Column, Cell } from 'fixed-data-table'

import 'fixed-data-table/dist/fixed-data-table-base.css'
import 'fixed-data-table/dist/fixed-data-table-style.css'

const TextCell = ({rowIndex, data, col, ...props}) => {
  return (
    <Cell {...props}>
      {data[rowIndex][col]}
    </Cell>
  )
}

const RoutesComponent = ({ routes, ...props }) => (
  <Table
    rowHeight={50}
    rowsCount={routes.length}
    headerHeight={50}
    width={1200}
    height={300}
    {...props}>
    <Column
      header={<Cell>Type</Cell>}
      cell={<TextCell data={routes} col="type"/>}
      fixed={true}
      width={100}
    />
    <Column
      header={<Cell>Path</Cell>}
      cell={<TextCell data={routes} col="cluster"/>}
      fixed={true}
      width={200}
    />
    <Column
      header={<Cell>Path</Cell>}
      cell={<TextCell data={routes} col="path"/>}
      fixed={true}
      width={400}
    />
    <Column
      header={<Cell>Route</Cell>}
      cell={<TextCell data={routes} col="route"/>}
      fixed={true}
      width={500}
    />
  </Table>
)

RoutesComponent.propTypes = {
  routes: PropTypes.array.isRequired
}

export default RoutesComponent