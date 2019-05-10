<template>
    <div class="h100 templet-wrap">
      <div class="head-wrap">
        <div class="project-name">
           <el-select v-model="currentProject" @change="handleChangeCurrentProject" placeholder="请选择">
            <el-option
              v-for="(item, index) in projectList"
              :key="index"
              :label="item.projectName"
              :value="item">
            </el-option>
          </el-select>
        </div> 
        <div>
          <el-button style="margin-right: 10px;">启动工程</el-button>
          <el-button @click="showSystemDialog" style="margin-right: 10px;">新建工程</el-button>
        </div>
      </div>
      <div class="body-wrap">
        <el-row :gutter="10">
            <el-col :span="12">
              <div class="project-page-list">
                <div class="list-item-head">页面列表</div>
                  <el-table
                    :data="pageList"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="页面名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="类型"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="cb"
                      label="操作">
                    </el-table-column>
                  </el-table>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="project-dev-list">
                <div class="list-item-head">
                  依赖列表
                  <i class="iconfont icon-Shapecopy iconfont-list-item-head-icon"></i>
                </div>
                <el-tabs v-model="activeTab">
                  <el-tab-pane label="dependencies" name="dependencies"></el-tab-pane>
                  <el-tab-pane label="devDependencies" name="devDependencies"></el-tab-pane>
                </el-tabs>
                <el-table
                  :data="devList"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="rule"
                    label="安装规则"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="version"
                    label="当前版本">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
        </el-row>
      </div>
      <el-dialog
        title="请输入工程信息"
        :visible.sync="dialogVisible">
        <el-form :model="currentProject" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="工程名" prop="projectName">
            <el-input v-model="currentProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="文件名" prop="fileName">
            <el-input v-model="currentProject.fileName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCreateProject('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
    import db from '@/../db/store.js'
    import process from 'child_process'
    export default {
        name: 'pageTemplete',
        // components: {
        //     'templetList': () => import('./components/list/index.vue'),
        //     'templetDetail': () => import('./components/detail/index.vue'),
        // },
        created() {
          let projects = db.get('projects').value();
          console.log('结果是', projects);
          this.projectList = projects;

        },
        mounted () {
          this.$electron.ipcRenderer.on('selected-directory', (event, path) => {
            let message = `你已选择${path}`
            console.log(message)
            this.currentProject.path = `${path}`
            this.dialogVisible = true
            // this.$db.set('project', {
            //   path: this.projectPath
            // }).write()
          })
          // this.projectPath = this.$db.get('project').value() ? this.$db.get('project').value().path : ''
        },
        data() {
            return {
              /////组件数据
              dialogVisible: false,
              rules: {
                name: [
                  { required: true, message: '请填写工程名', trigger: 'blur' }
                ],
              },
              /////
              currentProject: {
                projectName: '',
                fileName: '',
                path: ''
              },
              projectList: [],
              projectName: 'demo工程一',
              pageList: [{
                name: 'pageOne',
                type: '基本列表页'
              }],
              activeTab: 'dependencies',
              devList: [{
                name: 'axios',
                rule: '^0.18.0'
              },{
                name: 'element-ui',
                rule: '^2.2.2'
              },{
                name: 'lodash',
                rule: '^4.17.5'
              },{
                name: 'vue',
                rule: '^2.5.16'
              },{
                name: 'vue-router',
                rule: '^3.0.1'
              },{
                name: 'vuex',
                rule: '^3.0.1'
              }]
            }
        },
        methods: {
          showSystemDialog () {
            console.log(this.$electron)
            this.$electron.ipcRenderer.send('open-file-dialog')
          },
          handleCreateProject(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.dialogVisible = false
                console.log('所选对象是', this.currentProject)
                let projectList = db.get('projects').value()
                if(!projectList.find(i=>i.fileName === this.currentProject.fileName && i.path === this.currentProject.path)){
                  projectList.push(this.currentProject)
                  console.log('sss', projectList)
                  db.set('projects', projectList).write()
                  this.projectList = projectList
                  let command1 = `cd ${this.currentProject.path}`
                  let command2 = 'git clone https://github.com/stevenBZ/chloeTemplate.git'
                  let command = `${command1}&&${command2}`
                  console.log('指令为', command)
                  process.exec(command,function (error, stdout, stderr) {
                    if (error !== null) {
                      console.log('exec error: ' + error);
                    }
                  });
                }
              } else {
                return false
              }
            });
          },
          handleChangeCurrentProject(project){
            console.log('选中了', project)
          }
        }
    }
</script>
<style scope>
    .templet-wrap {
      padding: 0px;
    }
    .head-wrap {
      width: 100%;
      height: 80px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .project-name {
      margin-left: 20px;
      font-size: 18px;
    }
    .body-wrap {
      width: 100%;
      height: 400px;
    }
    .project-page-list {
      background: #fff;
      padding: 5px;
      height: 400px;
      overflow: scroll;
    }
    .project-dev-list {
      background: #fff;
      padding: 5px;
      height: 400px;
      overflow: scroll;
    }
    .list-item-head {
      border-bottom: 1px solid #ccc;
      height: 50px;
      line-height: 50px;
      padding-left: 5px;
    }
    .iconfont-xiala {
      color: #ccc;
      font-size:18px;
      position: relative;
      top: 4px;
      left: 10px;
    }
    .iconfont-list-item-head-icon {
      color: #58a;
      float:right;
      font-size: 16px;
      margin-right:10px;
    }
</style>
