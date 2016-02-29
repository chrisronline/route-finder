import React, { PropTypes } from 'react'

const RoutesLoadingComponent = ({ reposCount, reposTotal, trees }) => {
  const reposPercent = Math.round((reposCount / reposTotal) * 100) || 0
  const reposPercentLoaded = reposPercent + '%'
  const treeList = trees
    ? trees.map((tree, key) => {
        const controllersPercent = tree.controllersTotal == 0
          ? 100
          : Math.round((tree.controllersLoaded / tree.controllersTotal) * 100) || 0
        const controllersPercentLoaded = controllersPercent + '%'
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
            {tree.name} ({controllersPercentLoaded})
            {files}
          </li>
        )
      })
    : null

  return (
    <section className="home">
      <p>Loading...</p>
      <h3>Trees</h3>
      <h4>{reposPercentLoaded}</h4>
      <ul>
        {treeList}
      </ul>
    </section>
  );
}

RoutesLoadingComponent.propTypes = {
  reposCount: PropTypes.number.isRequired,
  reposTotal: PropTypes.number.isRequired,
  trees: PropTypes.array.isRequired,
}

export default RoutesLoadingComponent