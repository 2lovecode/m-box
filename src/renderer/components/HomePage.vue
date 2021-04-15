<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-row>
        <el-col>
          <el-carousel type="card" height="200px" :autoplay="false" arrow="always" trigger="click" indicator-position="none" @change="modeChange" :initial-index="defaultIndex">
            <el-carousel-item v-for="(item, index) in modeMap" :key="index">
              <el-row>
                <el-col align="center">
                  <h3 class="medium">{{ item.name }}</h3>
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
          <el-button type="info" round @click="start">开始</el-button>
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
        defaultIndex: 0,
        startPath: '/tools',
        modeMap: [
          {
            path: '/tools',
            name: '工具模式',
            img: 'static/images/list-1.jpg'
          },
          {
            path: '/games',
            name: '游戏模式',
            img: 'static/images/list-2.jpg'
          },
          {
            path: '/read',
            name: '阅读模式',
            img: 'static/images/list-3.jpg'
          }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      modeChange (changeIndex) {
        var path = this.modeMap[changeIndex].path
        if (path !== undefined && path !== '') {
          console.log(path)
          this.startPath = path
        }
      },
      start () {
        console.log(this.startPath)
        this.$router.push(this.startPath)
      }
    }
  }
</script>
<style scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>