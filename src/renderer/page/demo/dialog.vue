<template>
  <el-dialog :title="dialogTitle" :visible.sync="localStatus" @close="close">
  </el-dialog>
</template>
<script>
    export default {
        name: 'appBaselineDialog',
        props: ['dialogStatus', 'appBaselineDetail'],
        data() {
            return {
                localStatus: this.dialogStatus,
                labelPosition: 'left',
                dialogTitle: '主机基线详情'
            }
        },
        watch: {
            dialogStatus (val) {
                this.localStatus = val
            },
            localStatus (val) {
                this.$emit('on-status-change', val)
            },
        },
        methods: {
            close () {
                this.localStatus = false
            }
        }
    }
</script>