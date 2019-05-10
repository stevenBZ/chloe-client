<template>
    <div class="flex h100 interface-wrap">
      <div class="left">
        <el-form ref="form" :model="searchForm" label-width="60px" label-position="left">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input size="small" v-model="searchForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="">
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button size="small" style="float:right; margin-top: 5px;" type="primary">查询</el-button>
              <el-button size="small" style="float:right; margin-right:10px; margin-top: 5px;" >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
            :data="demoListData"
            border
            style="width: 100%; margin-bottom: 20px;">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="birth"
              label="生日">
            </el-table-column>
          </el-table>
      </div>
      <div class="right">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="列表接口">
            <el-input v-model="form.listInterfaceUrl"></el-input>
          </el-form-item>
          <el-form-item label="列表详情">
            <i class="iconfont icon-xinzeng iconfont-plus"></i>
          </el-form-item>
          <el-table
            :data="listData"
            border
            style="width: 100%; margin-bottom: 20px;">
            <el-table-column
              prop="props"
              label="属性">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="表头">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label="筛选项">
            <i class="iconfont icon-xinzeng iconfont-plus"></i>
          </el-form-item>
          <el-table
            :data="searchData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="props"
              label="变量名">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="interface"
              label="接口">
            </el-table-column>
            <el-table-column
              prop="relativeItems"
              label="关联项">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-button @click="handleGenCode" class="mg-t10" size="small" type="primary">生成页面</el-button>
      </div>
    </div>
</template>
<script>
    import fs from 'fs'
    import listTemplateGen from '@/codeGen/template/list/template'
    import listApiGen from '@/codeGen/api/list'
    import listScriptGen from '@/codeGen/script/list'
    export default {
        name: 'list-detail',
        data() {
            return {
              form: {
                listInterfaceUrl: 'api/v1/demo/list'
              },
              projectPath: '/Users/bob 1/mygitRepo/chloe/template-1',
              searchForm: {
                name: ''
              },
              listData: [{
                props: 'name',
                type: 'String',
                desc: '姓名'
              }, {
                props: 'birth',
                type: 'date',
                desc: '生日'
              }],
              searchData: [{
                name: 'name',
                props: '姓名',
                type: 'String',
                interface: '',
                relativeItems: ''
              }],
              demoListData: [],
              demoData: {
                name: 'testPage',   ////可以作为文件名使用
                route: '/test/aaa',
                isMenuPage: true,
                menuName: '测试页面一',
                pageType: 'basicList',
                pageDetail: {
                  interfaceList: [
                    {
                      name: 'getList',
                      url: 'api/v1/demo/getList',
                      headers: [],
                      paramsList: ['name'], ///// 接口的请求参数列表
                      reqDataType: 'json',   ///// 接口请求数据的类型
                      reqDataList: [],   ///// 接口的请求数据列表
                      retDataType: 'json',   ///// 接口返回数据的类型
                      retDataList: []    ////  接口的返回数据列表
                    }
                  ], /////所用接口列表
                  needSearchForm: true, ////是否需要搜索栏
                  searchFormData: [
                    {
                      name: 'name',
                      props: '姓名',
                      type: 'String',
                      interface: '',
                      relativeItems: ''
                    }
                  ], ////搜索栏详细数据
                  needNewButton: false,  ////是否需要新增按钮
                  newData: '',        /////新增的详细数据
                  listData: [{
                    props: 'name',
                    type: 'String',
                    desc: '姓名'
                  }, {
                    props: 'birth',
                    type: 'date',
                    desc: '生日'
                  }]        /////列表基本数据
                }
              }
            }
        },
        methods: {
          handleGenCode() {
            let tableName = 'tableDemo'
            let obj = this.demoData
            let listTemplate = listTemplateGen(obj, tableName)
            let listApiTemplate = listApiGen(tableName, this.tableInterfacePath)
            let listScriptTemplate = listScriptGen(tableName)
            console.log('模版是', listTemplate)
            let listFileTemplate = `
                ${listTemplate}
                ${listScriptTemplate}
            `
            // let listFileTemplate = `${listTemplate}`
            console.log('文件模板是', listFileTemplate)
            // let listPath = `${this.projectPath}/src/pages/demoList.vue`
            // this.writeTemplate2File(listPath, listFileTemplate)
            this.writeTemplate2File('/src/pages/demoList.vue', listFileTemplate)
            // this.writeTemplate2File('/src/api/list.js', listApiTemplate)
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
        }
    }
</script>
<style>
    .interface-wrap {
        padding: 20px;
    }
    .left {
      flex: 1;
      background: #fff;
      margin-right: 20px;
      padding: 20px;
    }
    .right {
      width: 300px;
      background: #fff;
      padding: 10px;
    }
    .iconfont-plus{
      color: #ccc;
    }
</style>
