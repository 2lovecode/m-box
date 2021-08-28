<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-row>
        <el-col>
          <el-carousel type="card" :autoplay="false" arrow="always" trigger="click" indicator-position="none" @change="modeChange" :initial-index="defaultIndex">
            <el-carousel-item v-for="(item, index) in modeMap" :key="index">
              <el-row style="height:100%;">
                <el-col align="center" style="height:100%;background-color:#F6F6F6;">
                  <el-image :src="item.img" fit="scale-down" style="height:100%;">
                  </el-image>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col>
          <div style="height:10em;">
          </div>
        </el-col>
        <el-col align="center">
          <el-button type="info" round @click="start">{{modeName}}</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>

  export default {
    name: 'home-page',
    data: () => {
      return {
        modeMap: [
          {
            path: '/tools',
            name: '工具',
            img: 'static/images/tools_001.jpeg'
          },
          {
            path: '/games',
            name: '游戏',
            img: 'static/images/games_001.jpeg'
          },
          {
            path: '/read',
            name: '阅读',
            img: 'static/images/read_001.jpeg'
          }
        ]
      }
    },
    computed: {
      defaultIndex: function () {
        return this.$store.getters.getMode
      },
      startPath: function () {
        var mode = 0
        if (this.$store.getters.getMode !== undefined) {
          mode = this.$store.getters.getMode
        }

        var path = this.modeMap[mode].path
        if (path !== undefined && path !== '') {
          return path
        }
        return this.modeMap[0].path
      },
      modeName: function () {
        var mode = 0
        if (this.$store.getters.getMode !== undefined) {
          mode = this.$store.getters.getMode
        }

        var name = this.modeMap[mode].name
        if (name !== undefined && name !== '') {
          return name
        }
        return this.modeMap[0].name
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      modeChange (changeIndex) {
        this.$store.dispatch('changeMode', changeIndex)
      },
      start () {
        console.log(this.startPath)
        this.$router.push(this.startPath)
      }
    }
  }
</script>
<style scoped>
  div {
    -webkit-app-region: no-drag;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>