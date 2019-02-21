<template>
    <div class="wrapper">
        <el-table
            :data="paramsList"
            @row-click="handleClickRow"
            border
            class="mg-b10"
            style="width: 100%">
            <el-table-column
            prop="name"
            label="名称">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.active" v-model="scope.row.name"></el-input>
                    <span v-if="!scope.row.active">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="type"
            label="类型">
                <template slot-scope="scope">
                    <el-select v-if="scope.row.active" v-model="scope.row.type" placeholder="请选择类型">
                        <el-option
                        v-for="item in paramsTypeList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                    <span v-if="!scope.row.active">{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="desc"
            label="描述">
                <template slot-scope="scope">
                    <div class="flex-between">
                        <el-input class="mg-r10" v-if="scope.row.active" v-model="scope.row.desc"></el-input>
                        <span v-if="!scope.row.active">{{ scope.row.desc }}</span>
                        <i @click="handleDeleteRow(scope.row)" class="iconfont icon-cha fl-r iconfont-cha"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button size="small" v-if="this.addFlag === false" @click="handleAddNewParams()">添加</el-button>
        <el-button size="small" v-if="this.addFlag === true || this.editFlag === true" class="fl-r mg-l10" type="primary" @click="handleConfirmNewParams()">确定</el-button>
        <el-button size="small" v-if="this.addFlag === true" class="fl-r" @click="handleCancelNewParams()">取消</el-button>
    </div>
</template>
<script>
    import { resetId } from '@/utils/list'
    export default {
        name: 'simpleParamsTable',
        props: {
          paramsList: {
              type: Array,
              default: () => []
          },
          paramsTypeList: {
              type: Array,
              default: () => []
          }
        },
        watch: {
            paramsList: {
                handler: function(val) {
                    resetId(val)
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                tableStatus: '',
                addFlag: false,
                editFlag: false
            }
        },
        methods: {
            handleClickRow(row, event, column){
                console.log('row是', row)
                row.active = true
                this.paramsList.forEach((item, index) => {
                    this.$set(this.paramsList, index, item)
                })
                this.editFlag = true
            },
            handleAddNewParams(){
                this.paramsList.push({
                    name: '',
                    type: 'String',
                    desc: '',
                    active: true
                })
                resetId(this.paramsList)
                this.addFlag = true;
            },
            handleConfirmNewParams(){
                this.paramsList.forEach(i => {
                    i.active = false
                })
                this.addFlag = false;
                this.editFlag = false;
                resetId(this.paramsList)
            },
            handleCancelNewParams(){
                this.paramsList.pop();
                this.addFlag = false;
                resetId(this.paramsList)
            },
            handleDeleteRow(row){
                let targetId = row.id
                this.paramsList.forEach((item, index) => {
                    if(item.id === targetId){
                        this.paramsList.splice(index, 1)
                    }
                })
                resetId(this.paramsList)
            }
        }
    }
</script>
<style scoped>
    .iconfont-cha {
        font-size: 12px;
        cursor: pointer;
    }
</style>