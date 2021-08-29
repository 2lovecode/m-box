<template>
  <el-container>
    <el-header>
      <h3>工具列表</h3>
    </el-header>
    <el-main>
      <el-card>
        <div slot="header" class="clearfix">
          <span>开发</span>
        </div>
        <el-row>
          <el-col :span="4" v-for="(item, index) in devTools" :key="index">
            <el-button plain @click="goToolItem(item.path, item.name)">{{ item.name }}</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div style="height:2em;"></div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>办公</span>
        </div>
        <el-row>
          <el-col :span="4" v-for="(item, index) in officeTools" :key="index">
            <el-button plain @click="goToolItem(item.path, item.name)">{{ item.name }}</el-button>
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
        },
        {
          name: 'Json格式化',
          path: '/tool-items/json-editor'
        },
        {
          name: '文件对比(待定)',
          path: '/tool-items/file-compare'
        }
      ],
      officeTools: [
        {
          name: '密码管理',
          path: '/tool-items/pass-manage'
        }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goToolItem (path, toolName) {
      // console.log(this.$store.dispatch)
      this.$store.dispatch('changeToolName', toolName)
      this.$router.push(path)
    }
  }
}
</script>