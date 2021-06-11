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
         <el-form-item label="时间格式">
          <el-select v-model="timetrans.format" filterable placeholder="请选择时间格式" style="width:18em;">
            <el-option
              v-for="(format, idx) in formatMap"
              :key="idx"
              :label="format.label"
              :value="format.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转时间戳">
          <el-col :span="8">
            <el-input v-model="timetrans.aBefore" placeholder="时间(2021-06-06 12:00:00)"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="success" icon="el-icon-d-arrow-right" @click="transStr2Timestamp"></el-button>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-input v-model="timetrans.aAfter"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="timetrans.aUnit">
              <el-option v-for="(unit, idx) in unitMap" :key="idx" :label="unit.label" :value="unit.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="转时间">
          <el-col :span="8">
            <el-input v-model="timetrans.bBefore" placeholder="时间戳(1622952000)"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="timetrans.bUnit">
              <el-option v-for="(unit, idx) in unitMap" :key="idx" :label="unit.label" :value="unit.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="success" icon="el-icon-d-arrow-right" @click="transTimestamp2Str"></el-button>
          </el-col>
          <el-col :span="8" :offset="1">
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
        aUnit: 1,
        bBefore: "",
        bAfter:"",
        bUnit: 1,
        format: "YYYY-MM-DD HH:mm:ss",
        timezone: "Asia/Shanghai"
      },
      formatMap: [
        {
          value: "YYYY-MM-DD HH:mm:ss",
          label: "YYYY-MM-DD HH:mm:ss",
        }
      ],
      unitMap: [
        {
          value: 1,
          label: "s(秒)",
        },
        {
          value: 2,
          label: "ms(毫秒)"
        }
      ]
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
    },
    transStr2Timestamp: function() {
      var nowTime = moment.tz(this.timetrans.aBefore, this.timetrans.timezone)
      var nowTimestamp = ""
      if (this.timetrans.aUnit == 1) {
        nowTimestamp = nowTime.unix()
      } else {
        nowTimestamp = nowTime.valueOf()
      }
      this.timetrans.aAfter = nowTimestamp
    },
    transTimestamp2Str: function () {
      var nowTimestamp = this.timetrans.bBefore
      if (this.timetrans.bUnit == 1) {
        nowTimestamp = nowTimestamp * 1000
      } else {
        nowTimestamp = nowTimestamp * 1
      }
      this.timetrans.bAfter = moment.tz(new Date(nowTimestamp), this.timetrans.timezone).format(this.timetrans.format)
    }
  }
}
</script>