export async function getOvalBostNumber(api) {
  const data = await api.query.polkapetModule.ovalBostNumber()

  return data.toHuman()
}

export async function getPolkapetsById(api, id) {
  const data = await api.query.polkapetModule.polkapetsById(id)
  console.log('data', data)
  return data.toHuman()
}

export function convertCamelCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, f => f.toUpperCase())
}
