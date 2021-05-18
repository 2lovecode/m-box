<template>
  <el-container>
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"  @click="goHome">
        <i class="el-icon-menu"></i>
        <span slot="title">去主页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>常玩游戏</span>
        </template>
        <el-menu-item v-for="(item, index) in gameMap" :key="index" @click="goToGameItem(item.path)" :index="item.idx">{{item.name}}</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>休闲游戏</span>
        </template>
        <el-menu-item index="1122">xxxxx</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-main>Main</el-main>
  </el-container>
</template>
<script>
export default {
  name: 'games-page',
  data: () => {
    return {
      gameMap: [
        {
          name: 'demo',
          path: '/game-items/demo',
          idx: '2-1'
        }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goToGameItem (path) {
      console.log(path)
      this.$router.push(path)
    },
    handleOpen (key, keyPath) {
      console.log('open')
    },
    handleClose (key, keyPath) {
      console.log('close')
    }
  }
}
</script>
<style scoped>

</style>
