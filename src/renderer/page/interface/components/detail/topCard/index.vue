<template>
  <div class="interface-detail-top-card-wrap">
    <h3>{{ interfaceDetail.name }}</h3>
  </div>
</template>
<script>
    export default {
        name: 'interfaceDetailTopCard',
        props: {
          interfaceDetail: {
              type: Object,
              default: () => {}
          },
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
  .interface-detail-top-card-wrap{
    padding: 5px;
  }
</style>