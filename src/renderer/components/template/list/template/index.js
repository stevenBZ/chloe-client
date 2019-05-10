import tableGen from '../../common/table/index'

export default function (propsData, tableName) {
  let tableData = propsData.listData
  let tableTemplate = tableGen(tableData, tableName)
  let listTemplate = `<template>
                ${tableTemplate}
                </template>`
  return listTemplate
}
