<template>
  <el-container>
    <el-header>
      <el-page-header @back="goGame" title="游戏">
      </el-page-header>
    </el-header>
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'game-items',
  data: () => {
    return {}
  },
  methods: {
    goGame () {
      this.$router.push('/games')
    }
  }
}
</script>