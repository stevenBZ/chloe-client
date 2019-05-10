export default function (tableName) {
  let fetchFuncName = `get${tableName}`
  return `
    <script>
    import {list} from '@/api/list'
    export default {
      name: "${tableName}",
      created () {
        this.init()
      },
      data () {
        return {
          ${tableName} : []
        }
      },
      methods: {
        init () {
          Promise.all([
            list.${fetchFuncName}()
          ]).then(values => {
            console.log(values[0])
          })
        }
      }
    }
  </script>`
}
