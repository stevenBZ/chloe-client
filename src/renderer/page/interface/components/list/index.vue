<template>
  <div class="interface-list-wrap c-card">
    <el-input></el-input>
    <div class="c-cut-off-line"></div>
    <div v-for="item in interfaceList" class="interface-item">
      <div class="interface-item-name">{{ item.name }}</div>
      <div class="interface-item-type" :class="getInterfaceItemTypeClass(item.type)">{{ item.type }}</div>
      <div class="interface-item-path">{{ item.path }}</div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'interfaceList',
        data() {
            return {
              interfaceList: [
                {
                  name: '测试接口一',
                  path: '/api/v1/test',
                  type: 'get'
                },
                {
                  name: '测试接口二',
                  path: '/api/v1/test2',
                  type: 'post'
                }
              ]
            }
        },
        methods: {
          getInterfaceItemTypeClass(type){
            const interfaceClassMap = {
              'get': 'bg-green',
              'post': 'bg-blue',
              'put': 'bg-pink',
              'delete': 'bg-red'
            }
            return interfaceClassMap[type]
          }
        }
    }
</script>
<style lang="scss" scoped>
  .interface-list-wrap{
    height: 100%;
    width: 200px;
    margin-right: 20px;
    overflow-y: scroll;
  }
  .interface-item {
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
    cursor: pointer;
    .interface-item-name {
      color: #58a;
      font-size: 14px;
    }
    .interface-item-type{
      width: 40px;
      color: #fff;
      padding-bottom: 5px;
      text-align: center;
      font-size: 12px;
      display: inline-block;
    }
    .interface-item-path {
      display: inline-block;
    }
  }
</style>