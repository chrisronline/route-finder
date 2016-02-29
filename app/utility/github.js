import GitHub from 'github-api'
import Promise from 'bluebird'

const github = new GitHub({ auth: 'token', token: '' })
const user = github.getUser()

export default { github }
export const getReposAsync = Promise.promisify(user.orgRepos)
export const repoMethodGenerator = (owner, name) => {
  const repo = github.getRepo(owner, name)
  return {
    getTreeAsync: Promise.promisify(repo.getTree),
    getContentsAsync: Promise.promisify(repo.contents)
  }
}