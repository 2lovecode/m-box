<template>
  <el-container>
    <el-main>
      <el-row>
        <el-form :inline="true" :model="pass" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input v-model="pass.name" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="pass.pass" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="insertRecord">添加</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="4">账号</el-col>
        <el-col :span="4">密码</el-col>
      </el-row>
      <el-row v-for="(v, idx) in records" :key="idx">
        <el-col :span="4">{{ v.name }}</el-col>
        <el-col :span="4">{{ v.pass }}</el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'pass-manage',
  data: () => {
    return {
      pass: {
        id : "",
        name: "",
        pass: ""
      },
      records: []
    }
  },
  mounted: function () {
    this.recordList()
  },
  methods: {
    recordList: function () {
      var me = this
      this.$electron.ipcRenderer.once('pass-manage-select-reply', function (event, arg) {
        me.records = arg
        console.log(me.records)
      })
      this.$electron.ipcRenderer.send('pass-manage-select', '')
    },
    insertRecord: function() {
      let me = this
      this.$electron.ipcRenderer.once('pass-manage-insert-reply', function (event, arg) {
        me.recordList()
      })
      this.$electron.ipcRenderer.send('pass-manage-insert', {
        id: me.pass.id,
        name: me.pass.name,
        pass: me.pass.pass
      })
    },
    updateRecord: function() {
      let me = this
      this.$electron.ipcRenderer.once('pass-manage-update-reply', function (event, arg) {
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('pass-manage-update', {
        id: me.id,
        name: "aaa",
        pass: "ddd"
      })
    }
  }
}
</script>