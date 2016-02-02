const fileRegExps = [
  /.*\/RouteConfig.cs/,
  /.*\/Global.asax.cs/,
  /.*\/*AreaRegistration.cs/
]

export default async function getAllMappedRouteFileContents(tree, getContentsAsync) {
  const results = []
  const files = tree.filter(file => fileRegExps.find(regExp => regExp.test(file.path)))
  for (let file of files) {
    const contents = await getContentsAsync('master', file.path)
    results.push(new Buffer(contents.content, 'base64').toString())
  }
  return results
}