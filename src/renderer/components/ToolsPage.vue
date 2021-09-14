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
  name: 'tools-page',
  data: () => {
    return {
      devTools: [
        {
          name: '时间转换',
          path: '/tool-items/time-trans'
        },
        {
          name: 'JSON编辑器',
          path: '/tool-items/json-editor'
        },
        {
          name: '文件对比',
          path: '/tool-items/file-compare'
        }
      ],
      officeTools: [
        {
          name: '密码管理',
          path: '/tool-items/pass-manage'
        },
        {
          name: '图片编辑',
          path: '/tool-items/image-editor'
        },
        {
          name: '视频编辑',
          path: '/tool-items/video-editor'
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
    goHome () {
      this.$router.push('/')
    },
    goToolItem (path, toolName) {
      // mbox-create-window
      this.$electron.ipcRenderer.send('mbox-create-window', {'name': toolName, 'path': path})
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