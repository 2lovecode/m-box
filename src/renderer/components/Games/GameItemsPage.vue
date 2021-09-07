<template>
  <el-container>
    <router-view></router-view>
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