<template>
  <div class="interface-detail-detail-card-wrap">
    <div class="tab-box">
      <div v-for="item in tabList" @click="handleChangeActiveTab(item.name)" class="tab-title" :class="{ tabActive: activeTab === item.name}">
        {{item.desc}}
      </div>
    </div>
    <request-card :interfaceDetail="interfaceDetail" v-show="activeTab === 'request'"></request-card>
  </div>
</template>
<script>
    export default {
        name: 'interfaceDetailDetailCard',
        props: {
          interfaceDetail: {
              type: Object,
              default: () => {}
          },
        },
        components: {
            'requestCard': () => import('./requestCard.vue'),
        },
        data() {
            return {
              activeTab: 'request',
              tabList: [
                {
                  name: 'request',
                  desc: '请求信息'
                },
                {
                  name: 'response',
                  desc: '返回信息'
                }
              ],
            }
        },
        methods: {
          handleChangeActiveTab(name){
            this.activeTab = name;
          }
        }
    }
</script>
<style lang="scss" scoped>
  .interface-detail-detail-card-wrap{
    padding: 5px;
    .tab-box{
      border-bottom: 1px solid #5af;
      margin-bottom: 10px;
      .tab-title{
        display: inline-block;
        margin-right: 5px;
        background: #ccc;
        padding: 5px;
        cursor: pointer;
      }
      .tabActive{
        background: #5af;
        color: #fff;
      }
    }
  }
</style>