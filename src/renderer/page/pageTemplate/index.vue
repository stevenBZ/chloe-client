<template>
    <div class="flex h100 templet-wrap">
        <div v-for="item in pageTemplateList" class="page-templates-box" @click="handleChoosePageTemplate(item)">
            <img :src="item.src" alt="" class="page-templates-img">
            <div class="page-templates-label">{{item.name}}</div>
        </div>
        <el-dialog
        title="请填写基本信息"
        :visible.sync="dialogVisible">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="页面名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="页面路由">
                <el-input v-model="form.route"></el-input>
            </el-form-item>
            <el-form-item label="菜单路由">
                <el-switch
                v-model="form.isMenuPage">
                </el-switch>
            </el-form-item>
            <el-form-item v-if="form.isMenuPage" label="菜单名">
                <el-input v-model="form.menuName"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleRoute2PageEdit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'pageTemplete',
        components: {
            'infoDialog': () => import('./components/infoDialog/index')
        },
        data() {
            return {
                pageTemplateList: [{
                    name: '列表页',
                    path: '/pageTemplete/list',
                    src: require('../../assets/pageTemplates/list.png')
                },{
                    name: '基础详情页',
                    path: '/pageTemplete/list',
                    src: require('../../assets/pageTemplates/detail.png')
                },{
                    name: '基础表单页',
                    path: '/pageTemplete/list',
                    src: require('../../assets/pageTemplates/form.png')
                }],
                dialogVisible: false,
                selectedTemplate: {
                    name: '',
                    route: '',
                    src: ''
                },
                form: {
                    name: '',
                    route: '',
                    isMenuPage: false,
                    menuName: ''
                }
            }
        },
        methods: {
            handleChoosePageTemplate(item) {
                this.selectedTemplate = item;
                this.dialogVisible = true;
            },
            handleRoute2PageEdit(){
                this.$router.push({
                    path: this.selectedTemplate.path
                })
            }
        }
    }
</script>
<style>
    .templet-wrap {
        padding: 20px;
    }
    .page-templates-box {
        margin: 20px;
        width: 200px;
        height: 160px;
        position: relative;
        border-radius: 30px;
        cursor: pointer;
    }
    .page-templates-img{
        width: 100%;
        height: 100%;;
    }
    .page-templates-label{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #323330;
        color:#fff;
        font-size: 12px;
    }
</style>
