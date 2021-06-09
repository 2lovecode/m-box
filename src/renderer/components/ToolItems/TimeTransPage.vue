<template>
  <el-container>
    <el-form :model="timetrans" label-width="6em" style="width:90%;">
        <el-form-item label="选择时区">
          <el-select v-model="timetrans.timezone" filterable placeholder="请选择时区" style="width:18em;">
            <el-option
              v-for="(zone, idx) in zoneMap"
              :key="idx"
              :label="zone.label"
              :value="zone.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转时间戳">
          <el-col :span="10">
            <el-input v-model="timetrans.aBefore"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="success" icon="el-icon-d-arrow-right"></el-button>
          </el-col>
          <el-col :span="10">
            <el-input v-model="timetrans.aAfter"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="转时间">
          <el-col :span="10">
            <el-input v-model="timetrans.bBefore"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="success" icon="el-icon-d-arrow-right"></el-button>
          </el-col>
          <el-col :span="10">
            <el-input v-model="timetrans.bAfter"></el-input>
          </el-col>
        </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
var moment = require('moment-timezone')

class zoneObj {
  value = ""
  offset = 0
  label = ""
}
export default {
  name: 'time-trans',
  data: () => {
    return {
      timetrans: {
        aBefore:"",
        aAfter:"",
        bBefore: "",
        bAfter:"",
        timezone: "Asia/Shanghai"
      }
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
      var zones = []

      countries.forEach((ele, idx) => {
        moment.tz.zonesForCountry(ele, true).forEach((e, i) => {
          var zo = new zoneObj

          if (e.offset > 0) {
            zo.label = e.name+"(GMT - "+e.offset/60+")"
          } else if (e.offset < 0) {
            zo.label = e.name+"(GMT + "+e.offset/60*-1+")"
          } else {
            zo.label = e.name+"(GMT - 0)"
          }

          zo.value = e.name
          zo.offset = e.offset
          zones.push(zo)
        })
      })
      zones.sort(function(a, b) {
        return b.offset - a.offset
      })
      return zones
    }
  }
}
</script>