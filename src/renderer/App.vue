<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
      :close-on-click-modal=false
      :close-on-press-escape=false
      :show-close=false
      :visible.sync="escDialogVisible">
      <el-row v-for="(eachData, idx) in escDialogContent()" :key="idx" style="margin:1em;">
        <el-col :offset="8" :span="8">
          <el-button type="primary" style="width:100%;" plain @click="handleButtonClick(eachData)">{{eachData.name}}</el-button>
        </el-col>
      </el-row>
      
    </el-dialog>   
  </div>
</template>

<script>
  var Mousetrap = require('mousetrap');
  export default {
    name: 'm-box',
    data: () => {
      return {
        escDialogVisible: false
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
      handleButtonClick: function (data) {
        this.escDialogVisible = false
        if ('isExit' in data && data.isExit === true) {
          this.$electron.ipcRenderer.send('mbox-close-action', {})
        }
        if ('path' in data) {
          this.$router.push(data.path)
        }
      },
      escDialogContent: function () {
        let currentPath = this.$router.history.current.path
        let menus = []

        switch (currentPath) {
          case '/':
             menus = [
              {
                'name': '退出',
                'isExit': true
              },
              {
                'name': '取消'
              }
            ]
            break
          case '/tools':
          case '/games':
            menus = [
              {
                'name': '回到主界面',
                'path': '/'
              },
              {
                'name': '退出',
                'isExit': true
              },
              {
                'name': '取消'
              }
            ]
            break
          default:
            if (currentPath.search('/game-items') === 0) {
              menus = [
                {
                  'name': '回到主界面',
                  'path': '/'
                },
                {
                  'name': '游戏列表',
                  'path': '/games'
                },
                {
                  'name': '退出',
                  'isExit': true
                },
                {
                  'name': '取消'
                }
              ]
            } else if (currentPath.search('/tool-items') === 0) {
              menus = [
                {
                  'name': '回到主界面',
                  'path': '/'
                },
                {
                  'name': '工具列表',
                  'path': '/tools'
                },
                {
                  'name': '退出',
                  'isExit': true
                },
                {
                  'name': '取消'
                }
              ]
            } else {
              menus = [
                {
                  'name': '回到主界面',
                  'path': '/'
                },
                {
                  'name': '退出',
                  'isExit': true
                },
                {
                  'name': '取消'
                }
              ]
            }
        }
        return menus
      }
    }
  }
  
</script>

<style>
  /* CSS */
  body {
    margin: 0;
    padding: 0;
    -webkit-app-region:drag;
  }
  a, i, button, span, input, select{
    -webkit-app-region: no-drag;
  }
</style>
