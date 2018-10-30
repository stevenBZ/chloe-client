import tableColumnGen from './table-column/index'
export default function (interfaceData, tableName) {
  let props = Object.keys(interfaceData)
  let tableTemplate = ''
  props.forEach(props => {
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
