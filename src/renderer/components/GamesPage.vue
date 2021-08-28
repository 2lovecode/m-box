<template>
  <el-container>
    <el-header>
      <h3>游戏列表</h3>
    </el-header>
    <el-main>
      <el-row :gutter="12">
        <el-col :span="8" v-for="(item, index) in gameMap" :key="index">
          <el-card shadow="hover">
            <span @click="goToGameItem(item.path)" style="display:block;text-align:center;">{{ item.name }}</span>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
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
        }
      ]
    }
  },
  methods: {
    goToGameItem (path) {
      console.log(path)
      this.$router.push(path)
    },
  }
}
</script>
<style scoped>

</style>
