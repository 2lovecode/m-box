<template>
  <el-row>
    <el-col>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="getM">立即创建</el-button>
    </el-col>
  </el-row>
</template>
<script>
var moment = require('moment-timezone')

export default {
  name: 'time-trans',
  data: () => {
    return {
      input: moment().tz("America/Los_Angeles").format()
    }
  },
  methods: {
    getM: function() {
      var citys = moment.tz.countries()

      citys.forEach((ele, idx) => {
        console.log(ele)
      })
      // console.log(moment.tz.countries())
    }
  }
}
</script>