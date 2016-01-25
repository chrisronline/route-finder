import Promise from 'bluebird'
import github from './util/github'
import extract from './extract'
import config from '../config.json'

const getTreeAsync = Promise.promisify(github.gitdata.getTree)
const getContentAsync = Promise.promisify(github.repos.getContent)

export default async () => {
  const results = []
  const repos = config.github.repos
  for (let repoDetails of repos) {
    const { user, repo, controllersPath } = repoDetails
    const controllersPathRegExp = new RegExp(controllersPath)
    
    // Fetch the contents and extract the package files
    console.log('Fetching tree for %s', repo)
    const { tree } = await getTreeAsync({ user, repo, sha: 'HEAD', recursive: true })
    const controllers = tree.filter(t => controllersPathRegExp.test(t.path))
    for (let controller of controllers) {
      console.log('Fetching content from %s', controller.path)
      const rawContent = await getContentAsync({ user, repo, path: controller.path })
      const rawFile = new Buffer(rawContent.content, 'base64').toString()
      const routes = extract(rawFile)
      results.push(routes.map(r => {
        return Object.assign({}, r, { file: controller.path })
      }))
    }
  }
  return results.reduce((a, b) => a.concat(b))
}