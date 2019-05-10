import tableGen from '../../common/table/index'

export default function (interfaceData, tableName) {
  let tableTemplate = tableGen(interfaceData, tableName)
  let listTemplate = 
`
<template>
${tableTemplate}
</template>
`
  return listTemplate
}
