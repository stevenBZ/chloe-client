<template>
    <div class="flex h100 interface-wrap">
        <interface-list></interface-list>
        <interface-detail></interface-detail>
    </div>
</template>
<script>
    export default {
        name: 'interface',
        components: {
            'interfaceList': () => import('./components/list/index.vue'),
            'interfaceDetail': () => import('./components/detail/index.vue'),
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
<style>
    .interface-wrap {
        padding: 20px;
    }
</style>
