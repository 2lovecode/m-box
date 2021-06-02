<template>
  <el-row>
    <el-col>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-select v-model="timezone" filterable placeholder="请选择时区">
        <el-option
          v-for="(zone, idx) in zoneMap"
          :key="idx"
          :label="zone"
          :value="idx">
        </el-option>
      </el-select>
      <!-- <el-button type="primary" @click="getZoneMap">立即创建</el-button> -->
    </el-col>
  </el-row>
</template>
<script>
var moment = require('moment-timezone')

export default {
  name: 'time-trans',
  data: () => {
    return {
      input: moment().tz("America/Los_Angeles").format(),
      timezone: ""
    }
  },
  computed: {
    zoneMap: function () {
      return this.getZoneMap()
    },
  },
  methods: {
    getZoneMap: function() {
      var countries = moment.tz.countries()
      var zones = {}

      countries.forEach((ele, idx) => {
        moment.tz.zonesForCountry(ele, true).forEach((e, i) => {

          var str = ""
          if (e.offset > 0) {
            str = "GMT-"+e.offset/60
          } else {
            str = "GMT+"+e.offset/60*-1
          }
          zones[e.name] = e.name+"["+str+"]"
        })
      })
      return zones
    }
  }
}
</script>