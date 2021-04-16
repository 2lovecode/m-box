<template>
  <el-container>
    <el-aside width="200px">
      <el-row>
        <el-col>
          <el-button @click="goHome">主页</el-button>
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
    return {}
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
