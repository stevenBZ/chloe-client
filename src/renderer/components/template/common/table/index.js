import tableColumnGen from './table-column/index'
export default function (propsData, tableName) {
  let tableTemplate = ''
  propsData.forEach(props => {
    let tableColumnTemplate = tableColumnGen(props)
    tableTemplate = `${tableTemplate}${tableColumnTemplate}\n`
  })
  tableTemplate = `<el-table
                        :data="${tableName}"
                        border
                        style="width: 100%">
                    ${tableTemplate}
                    </el-table>`
  return tableTemplate
}
