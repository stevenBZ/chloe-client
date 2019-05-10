import utilsImport from '../common/utils'
export default function (tableName, interfacePath) {
  let fetchFuncName = `get${tableName}`
  let utilsTemplate = utilsImport()
  return `
${utilsTemplate}
export function ${fetchFuncName}() {
  return ajax.get('${interfacePath}');
}
`
}
