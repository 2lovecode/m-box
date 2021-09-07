<template>
  <el-container> 
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  name: 'tool-items',
  data: () => {
    return {}
  }
}
</script>
<style scoped>
  div {
    -webkit-app-region: no-drag;
  }
</style>