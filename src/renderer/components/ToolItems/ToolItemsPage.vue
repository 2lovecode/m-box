<template>
  <el-container>
    <el-header>
      <h4>{{getToolName}}</h4>
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
  computed: {
    getToolName: function () {
      return this.$store.getters.getToolName
    }
  },
  methods: {
    goTool () {
      this.$router.push('/tools')
    }
  }
}
</script>
<style scoped>
  div {
    -webkit-app-region: no-drag;
  }
</style>