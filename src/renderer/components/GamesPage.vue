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
    <el-dialog
      :close-on-click-modal=false
      :close-on-press-escape=false
      :show-close=false
      :visible.sync="escDialogVisible">
      <el-row v-for="(eachData, idx) in escDialogContent" :key="idx" style="margin:1em;">
        <el-col :offset="8" :span="8">
          <el-button type="primary" style="width:100%;" plain @click="handleButtonClick(eachData)">{{eachData.name}}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
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
      ],
      escDialogVisible: false,
      escDialogContent: [
        {
          'name': '回到主界面',
          'path': '/'
        },
        {
          'name': '取消'
        }
      ]
    }
  },
  created: function () {
    let me = this
    // 退出界面
    Mousetrap.bind('esc', function() {
      me.escDialogVisible = true
    });
  },
  methods: {
    goToGameItem (path) {
      console.log(path)
      this.$router.push(path)
    },
    handleButtonClick: function (data) {
      this.escDialogVisible = false
      if ('isExit' in data && data.isExit === true) {
        this.$electron.ipcRenderer.send('mbox-close-window', {'name': 'main'})
      }
      if ('path' in data) {
        this.$router.push(data.path)
      }
    }
  }
}
</script>
<style scoped>

</style>
