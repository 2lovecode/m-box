<template>
  <el-container>
    <el-header>
      <el-page-header @back="goTool" title="工具" content="列表">
      </el-page-header>
    </el-header>
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'tool-items',
  data: () => {
    return {}
  },
  methods: {
    goTool () {
      this.$router.push('/tools')
    }
  }
}
</script>