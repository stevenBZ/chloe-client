<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-aside width="100px" class="aside">
      <div v-for="(item, index) in catalog">
        <router-link :to="item.url" class="router-link">
          <div class="menu-item">
            <i class="iconfont icon-xxx" :class="item.icon"></i>
            <span class="menu-item-title">{{ item.title }}</span>
          </div>
        </router-link>
      </div>
      </el-aside>
      <el-main class="page-wrapper">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import catalog from './config/catalog'
  export default {
    name: 'my-project',
    data() {
        return {
            catalog,
            footerHeight: '30px'
        };
    },
  }
</script>

<style>
  #app{
    height: 100%;
  }
  .aside{
    background:#323330;
  }
  .router-link{
    text-decoration: none;
  }
  .menu-item{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
  }
  .menu-item:hover{
    color: #58a;
  }
  .iconfont{
    font-size: 30px;
  }
  .menu-item-title{
    font-size: 12px;
  }
</style>
