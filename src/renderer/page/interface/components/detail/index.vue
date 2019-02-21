<template>
  <div class="interface-detail-wrap c-card">
    <top-card
      :interfaceDetail="interfaceDetail"
    ></top-card>
    <detail-card
      :interfaceDetail="interfaceDetail"
    ></detail-card>
  </div>
</template>
<script>
    export default {
        name: 'interfaceDetail',
        components: {
            'topCard': () => import('./topCard/index.vue'),
            'detailCard': () => import('./detailCard/index.vue'),
        },
        data() {
            return {
              interfaceDetail: {
                  name: '测试接口一',
                  path: '/api/v1/test',
                  type: 'get'
              }
            }
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
  .interface-detail-wrap{
    height: 100%;
    flex: 1;
    overflow-y: scroll;
  }
</style>