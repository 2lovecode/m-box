<template>
  <el-container>
    <el-aside width="200px">
      <el-row>
        <el-col>
          <el-button @click="goHome">主页</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button v-for="(item, index) in gameMap" :key="index" @click="goToGameItem(item.path)">{{item.name}}</el-button>
        </el-col>
      </el-row>
    </el-aside>
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
          path: '/game-items/demo'
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
    }
  }
}
</script>
