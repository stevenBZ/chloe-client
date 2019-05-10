<template>
    <div class="flex h100 templet-wrap">
        <div v-for="item in pageTemplateList" class="page-templates-box">
            <img :src="item.src" alt="" class="page-templates-img">
            <div class="page-templates-label">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'pageTemplete',
        // components: {
        //     'templetList': () => import('./components/list/index.vue'),
        //     'templetDetail': () => import('./components/detail/index.vue'),
        // },
        data() {
            return {
                pageTemplateList: [{
                    name: '基础模板01',
                    src: require('@/assets/projectTemplates/project1.png')
                },{
                    name: 'vue-element-admin',
                    src: require('@/assets/projectTemplates/project2.png')
                },{
                    name: 'Ice-admin',
                    src: require('@/assets/projectTemplates/project3.png')
                }]
            }
        },
        methods: {
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
