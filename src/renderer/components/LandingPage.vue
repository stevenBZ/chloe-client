<template>
  <div id="wrapper">
    <main>
      <div class="head">
        <span class="title">
          Chloe Platform
        </span>
      </div>
      <div class="interfaceTitle">
        <input placeholder="请输入接口路径" type="text" v-model="tableInterfacePath">
      </div>
      <div class="interfaceContent">
        <textarea 
          v-model="tableInterface" 
          placeholder="请输入接口" 
          name="" 
          id="" 
          cols="60" 
          rows="10">
        </textarea>
      </div>
      <div class="opBtns">
        <button @click="showSystemDialog">打开系统文件夹</button>
        <button @click="handleReadFile">生成页面</button>
      </div>
      <div class="information">
        <div class="information-title">工程目录是 : {{projectPath}}</div>
        <!-- <div class="information-title">文件内容是 :</div>
        <pre>{{projectContent}}</pre> -->
      </div>
    </main>
  </div>
</template>

<script>
  import fs from 'fs'
  import listTemplateGen from './template/list/template'
  import listApiGen from './api/list'
  import listScriptGen from './script/list'
  import jsBeautify from 'js-beautify'
  export default {
    name: 'landing-page',
    data () {
      return {
        projectPath: '/Users/bob/mygitRepo/chloe/test-project',
        projectContent: '',
        tableInterface: `{
          "name": "string",
          "address": "string"
}`,
        tableInterfacePath: '/v1/api/getList'
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('selected-directory', (event, path) => {
        let message = `你已选择${path}`
        console.log(message)
        this.projectPath = `${path}`
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      showSystemDialog () {
        console.log(this.$electron)
        this.$electron.ipcRenderer.send('open-file-dialog')
      },
      writeTemplate2File (path, template) {
        fs.writeFile(`${this.projectPath}${path}`, template, function (error) {
          if (error) {
            console.log(error)
            return false
          }
          console.log('写入成功')
        })
      },
      handleReadFile () {
        // let that = this
        // fs.readFile(this.projectPath, {encoding: 'utf-8'}, function (err, fr) {
        //   if (err) {
        //     console.log(err)
        //   } else {
        //     that.projectContent = fr
        //   }
        // })
        let obj = JSON.parse(this.tableInterface)
        let tableName = 'tableDemo'
        let listTemplate = jsBeautify.html(listTemplateGen(obj, tableName))
        let listApiTemplate = listApiGen(tableName, this.tableInterfacePath)
        let listScriptTemplate = listScriptGen(tableName)
        console.log('模版是', listTemplate)
        let listFileTemplate = `
        ${listTemplate}
        ${listScriptTemplate}
        `
        this.writeTemplate2File('/src/pages/demoList.vue', listFileTemplate)
        this.writeTemplate2File('/src/api/list.js', listApiTemplate)
        // fs.writeFile(`${this.projectPath}/src/pages/demoList.vue`, listTemplate, function (error) {
        //   if (error) {
        //     console.log(error)
        //     return false
        //   }
        //   console.log('写入成功')
        // })
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  .head{
    margin:1.2em
  }


  button {
    font-size: .8em;
    cursor: pointer;
    margin: 1em;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .information-title{
    margin: 1em
  }
  .opBtns{
    display: inline;
  }
  .interfaceTitle{
    margin: 1em;
  }
  .interfaceTitle input{
    width: 35em;
    height: 2em;
    border:1px solid #ccc;
    padding: .1em;
  }
  .interfaceContent{
    margin: 1em;
  }
  .interfaceContent textarea{
    padding: .5em;
  }
</style>
