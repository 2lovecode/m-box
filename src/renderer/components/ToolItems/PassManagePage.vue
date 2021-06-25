<template>
  <el-container>
    <el-header>
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
    </el-header>
    <el-main>
      <el-card>
      <div slot="header" class="clearfix">
        <span>账号列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleRefresh">刷新</el-button>
      </div>
      <el-table :data="records">
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="pass" label="密码"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleCopy(scope.row)" type="text" size="small">复制</el-button>
            <el-button @click="handleShow(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'pass-manage',
  data () {
    return {
      pass: {
        id: '',
        name: '',
        pass: ''
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
    insertRecord: function () {
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
    updateRecord: function () {
      let me = this
      this.$electron.ipcRenderer.once('pass-manage-update-reply', function (event, arg) {
        console.log(arg)
      })
      this.$electron.ipcRenderer.send('pass-manage-update', {
        id: me.id,
        name: 'aaa',
        pass: 'ddd'
      })
    },
    handleRefresh: function () {
      this.recordList()
    },
    handleCopy: function (data) {
      this.$message('复制成功')
      this.$electron.clipboard.writeText(data.pass)
      console.log(data.id)
    },
    handleShow: function (data) {
      console.log(data.name)
    },
    handleDelete: function (data) {
      let me = this
      this.$electron.ipcRenderer.once('pass-manage-delete-reply', function (event, arg) {
        me.recordList()
      })
      this.$electron.ipcRenderer.send('pass-manage-delete', {
        id: data.id
      })
      console.log(data.pass)
    }
  }
}
</script>