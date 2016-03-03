import React, { Component, PropTypes } from 'react'
import FixedDataTable, { Table, Column, Cell } from 'fixed-data-table'
import { SortTypes } from '../sort/sort.actions'

import 'fixed-data-table/dist/fixed-data-table-base.css'
import 'fixed-data-table/dist/fixed-data-table-style.css'

const TextCell = ({rowIndex, data, col, ...props}) => {
  return (
    <Cell {...props}>
      {data[rowIndex][col]}
    </Cell>
  )
}

const LinkCell = ({rowIndex, data, colText, colHref, ...props}) => {
  return (
    <Cell {...props}>
      <a href={data[rowIndex][colHref]}>
        {data[rowIndex][colText]}
      </a>
    </Cell>
  )
}

const SortHeaderCell = ({changeSort, sortDir, columnKey, children, ...props}) => {
  return (
    <Cell {...props}>
      <a onClick={() => changeSort(columnKey, sortDir)}>
        {children} {sortDir ? (sortDir === SortTypes.DESC ? '(desc)' : '(asc)') : ''}
      </a>
    </Cell>
  )
}

const RoutesComponent = ({ changeSort, sortDir, routes, ...props }) => (
  <Table
    rowHeight={50}
    rowsCount={routes.length}
    headerHeight={50}
    width={1200}
    height={800}
    {...props}>
    <Column
      columnKey="type"
      header={
        <SortHeaderCell
          changeSort={changeSort}
          sortDir={sortDir}>
          Type
        </SortHeaderCell>
      }
      cell={<TextCell data={routes} col="type"/>}
      fixed={true}
      width={100}
    />
    <Column
      columnKey="cluster"
      header={
        <SortHeaderCell
          changeSort={changeSort}
          sortDir={sortDir}>
          Cluster
        </SortHeaderCell>
      }
      cell={<TextCell data={routes} col="cluster"/>}
      fixed={true}
      width={200}
    />
    <Column
      columnKey="path"
      header={
        <SortHeaderCell
          changeSort={changeSort}
          sortDir={sortDir}>
          Path
        </SortHeaderCell>
      }
      cell={<LinkCell data={routes} colText="path" colHref="pathUrl"/>}
      fixed={true}
      width={400}
    />
    <Column
      columnKey="route"
      header={
        <SortHeaderCell
          changeSort={changeSort}
          sortDir={sortDir}>
          Route
        </SortHeaderCell>
      }
      cell={<TextCell data={routes} col="route"/>}
      fixed={true}
      width={500}
    />
  </Table>
)

RoutesComponent.propTypes = {
  routes: PropTypes.array.isRequired,
  changeSort: PropTypes.func.isRequired
}

export default RoutesComponent