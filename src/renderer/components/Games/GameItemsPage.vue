<template>
  <el-container>
    <el-header>
      <h4>游戏</h4>
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