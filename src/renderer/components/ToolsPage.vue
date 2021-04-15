<template>
  <el-container>
    <el-header>
      <el-page-header @back="goHome" title="主页" content="工具">
      </el-page-header>
    </el-header>
    <el-main>
      <el-card>
        <div slot="header" class="clearfix">
          <span>开发工具</span>
        </div>
        <el-row>
          <el-col :span="4" v-for="(item, index) in devTools" :key="index">
            <el-button plain @click="goToolItem(item.path)">{{ item.name }}</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'tools-page',
  data: () => {
    return {
      devTools: [
        {
          name: '时间转换',
          path: '/tool-items/time-trans'
        }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goToolItem (path) {
      this.$router.push(path)
    }
  }
}
</script>