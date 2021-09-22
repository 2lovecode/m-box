<template>
  <el-container>
    <el-header>
      <h4>密码管理</h4>
    </el-header>
    <el-main>
      <el-header>
        <el-row>
          <el-form :inline="true" :model="pass" class="demo-form-inline">
            <el-form-item label="类别">
              <el-input v-model="pass.item" placeholder="类别"></el-input>
            </el-form-item>
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
          <el-table-column prop="item" label="类别"></el-table-column>
          <el-table-column prop="name" label="账号"></el-table-column>
          <el-table-column prop="pass2" data="pass" label="密码"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleCopy(scope.row)" type="text" size="small">复制</el-button>
              <el-popover
                placement="bottom"
                trigger="click"
                :content="scope.row.pass">
                <el-button type="text" size="small" slot="reference">查看</el-button>
              </el-popover>
              <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
              <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这条记录吗？"
                @confirm="handleDelete(scope.row)"
              >
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog :title="editForm.name" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="密码">
            <el-input v-model="editForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-input v-model="editForm.id" type="hidden"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleEditCancel(data)">取 消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">确 定</el-button>
        </div>
      </el-dialog>
      </el-main>
    </el-main>
  </el-container>
</template>
<script>
import { IPCPayload } from '../../../utils/ipcpayload'
import {passRecordList, passRecordAdd, passRecordEdit, passRecordDel} from '../../../utils/const'
export default {
  name: 'pass-manage',
  data () {
    return {
      pass: {
        id: '',
        item: '',
        name: '',
        pass: '',
        pass2: ''
      },
      editDialogFormVisible: false,
      editForm: {
        id: '',
        item: '',
        pass: '',
        name: ''
      },
      records: []
    }
  },
  mounted: function () {
    this.recordList()
    var me = this
    this.$electron.ipcRenderer.on('mbox-response', function (event, arg) {
      var operation = ''
      var data = {}
      if ('operation' in arg) {
        operation = arg.operation
      }
      if ('data' in arg) {
        data = arg.data
      }
      switch (operation) {
        case passRecordList:
          if (Array.isArray(data)) {
            var records = new Array()
            for (let i = 0, l = data.length; i < l; i++) {
              records[i] = {
                id: data[i].id,
                item: data[i].item,
                name: data[i].name,
                pass: data[i].pass,
                pass2: '******'
              }
            }
            me.records = records
          }
          break
        case passRecordAdd:
          me.recordList()
          break
        case passRecordEdit:
          me.recordList()
          break
        case passRecordDel:
          me.recordList()
          break
      }
    })
  },
  methods: {
    recordList: function () {
      var ipcPayload = new IPCPayload(passRecordList, {})
      this.$electron.ipcRenderer.send('mbox-request', ipcPayload.toJSON())
      this.pass.id = ''
      this.pass.item = ''
      this.pass.name = ''
      this.pass.pass = ''
      this.pass.pass2 = ''
    },
    insertRecord: function () {
      var ipcPayload = new IPCPayload(passRecordAdd, {
        id: this.pass.id,
        item: this.pass.item,
        name: this.pass.name,
        pass: this.pass.pass
      })
      this.$electron.ipcRenderer.send('mbox-request', ipcPayload.toJSON())
    },
    updateRecord: function () {
      var ipcPayload = new IPCPayload(passRecordEdit, {
        id: me.id,
        item: 'Category',
        name: 'aaa',
        pass: 'ddd'
      })
      this.$electron.ipcRenderer.send('mbox-request', ipcPayload.toJSON())
    },
    handleRefresh: function () {
      this.recordList()
    },
    handleCopy: function (data) {
      this.$message('复制成功')
      this.$electron.clipboard.writeText(data.pass)
    },
    handleShow: function (data) {
      console.log(data.pass)
    },
    handleDelete: function (data) {
      var ipcPayload = new IPCPayload(passRecordDel, {
        id: data.id
      })
      this.$electron.ipcRenderer.send('mbox-request', ipcPayload.toJSON())
    },
    handleEdit: function (data) {
      this.editForm.id = data.id
      this.editForm.item = data.item
      this.editForm.name = data.name
      this.editForm.pass = data.pass
      this.editDialogFormVisible = true
    },
    handleEditConfirm: function (data) {
      var ipcPayload = new IPCPayload(passRecordEdit, {
        id: this.editForm.id,
        item: this.editForm.item,
        name: this.editForm.name,
        pass: this.editForm.pass
      })
      this.$electron.ipcRenderer.send('mbox-request', ipcPayload.toJSON())
      this.editDialogFormVisible = false
    },
    handleEditCancel: function (data) {
      this.editDialogFormVisible = false
    }
  }
}
</script>
