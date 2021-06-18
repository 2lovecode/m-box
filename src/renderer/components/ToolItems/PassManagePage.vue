<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-button @click="recordList">刷新</el-button>
          <el-button @click="insertRecord">插入</el-button>
          <el-button @click="updateRecord">更新</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'pass-manage',
  data: () => {
    return {}
  },
  created: function () {
    
    
  },
  methods: {
    recordList: function () {
      this.$electron.ipcRenderer.once('pass-manage-select-reply', function (event, arg) {
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('pass-manage-select', "a")
    },
    insertRecord: function() {
      this.$electron.ipcRenderer.once('pass-manage-insert-reply', function (event, arg) {
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('pass-manage-insert', {
        id: 1,
        name: "aaa",
        pass: "ccc"
      })
    },
    updateRecord: function() {
      this.$electron.ipcRenderer.once('pass-manage-update-reply', function (event, arg) {
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('pass-manage-update', {
        id: 1,
        name: "aaa",
        pass: "ddd"
      })
    }
  }
}
</script>