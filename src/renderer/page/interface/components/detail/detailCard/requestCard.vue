<template>
  <div>
    <div>
      <span class="detial-prop-key">请求地址: </span>
      <span class="detail-prop-value">{{ interfaceDetail.path }}</span>
    </div>
    <div class="mg-b20">
      <span class="detial-prop-key">请求方式: </span>
      <span class="detail-prop-value">{{ interfaceDetail.type }}</span>
    </div>
    <div class="mg-b20">
      <span class="detial-prop-key mg-b10">路径参数: </span>
      <simple-params-table 
        :paramsList="paramsList"
        :paramsTypeList="paramsTypeList"></simple-params-table>
    </div>
    <div>
      <div class="flex-between">
        <span class="detial-prop-key mg-b10">请求数据: </span>
        <el-radio v-for="item in reqDataTypeList" v-model="reqDataType" :label="item.name">{{ item.desc }}</el-radio>
      </div>
      <params-table 
        v-if="reqDataType === 'Object' || reqDataType === 'Array'"
        :paramsList="dataList"></params-table>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'interfaceDetailDetailCardRequestCard',
        props: {
          interfaceDetail: {
              type: Object,
              default: () => {}
          },
        },
        components: {
          'paramsTable': () => import('@/components/paramsTable/index.vue'),
          'simpleParamsTable': () => import('@/components/simpleParamsTable/index.vue')
        },
        data() {
            return {
              paramsList: [{
                name: 'testParams',
                type: 'String',
                desc: '测试参数'
              }],
              paramsTypeList: [{
                    name: 'String',
                    desc: '字符串'
                },{
                    name: 'Boolean',
                    desc: '布尔型'
                },{
                    name: 'Number',
                    desc: '数字'
              }],
              reqDataType: 'Object',
              reqDataTypeList: [{
                name: 'Object',
                desc: '对象'
              },{
                name: 'Array',
                desc: '数组'
              },{
                name: 'String',
                desc: '字符串'
              },{
                name: 'Number',
                desc: '数字'
              },{
                name: 'Boolean',
                desc: '布尔型'
              }],
              dataList: [{
                name: 'eeee',
                type: 'Object',
                desc: '测试属性',
                data: [{
                  name: 'sonEEE',
                  type: 'String',
                  desc: '子属性'
                }]
              }, {
                name: 'tttt',
                type: 'Array',
                desc: '测试属性-数组',
                itemType: 'Object',
                itemData: [{
                  name: 'uuuu',
                  type: 'String',
                  data: 'uuuu'
                }]
              }]
            }
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
  .detial-prop-key{
    font-size: 14px;
    margin-right: 5px;
    color: #a9a9a9;
  }
  .detail-prop-value {
    font-size: 14px;
  }
</style>