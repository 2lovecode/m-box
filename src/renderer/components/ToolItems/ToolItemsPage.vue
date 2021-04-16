<template>
  <el-container>
    <el-header>
      <el-page-header @back="goTool" title="工具" :content="getToolName">
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