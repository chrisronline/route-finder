import find from './lib/find'

async function run() {
  const routes = await find()
  return routes
}

run().then(routes => console.log(routes)).catch(e => console.error(e))
