<template>
    <el-row>
      <el-col>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-col>
      <el-col :offset="10" :span="4" style="margin-top:1em; margin-bottom:1em;">
        <el-button style="width:100%;" @click="handleJsonFormat">格式化</el-button>
      </el-col>
      <el-col :span="24">
        <div id="jsoneditor" style="width: 100%; height: 100%"></div>
      </el-col>
    </el-row>
</template>
<script>

export default {
  name: 'json-editor',
  data() {
    return {
      textarea: "",
      jsonEditor: null
    };
  },
  mounted() {
    this.initJsonEditor()
  },
  methods: {
    initJsonEditor: function () {
      var container = document.getElementById("jsoneditor")
      var options = {
        mode: "view"
      };
      var editor = new this.$jsoneditor(container, options)
      this.jsonEditor = editor
    },
    handleJsonFormat: function () {
      if (this.textarea.trim() === '') {
         this.$message.error('当前JSON内容为空！')
         return
       }
       // 验证一下json内容是否正确
       var jsonnnn = {a: "b"}
       console.log(jsonnnn)
       var json222 = '{"result": "ccc", "count":42}';
       console.log(typeof(json222))
       console.log(json222)
       console.log(JSON.parse(json222))
       try {
         console.log(typeof(this.textarea))
         detail = JSON.parse(this.textarea)
         this.jsonEditor.set(detail)
       } catch (e) {
         console.log(this.textarea)
         console.log(e)
         this.$message({
          showClose: true,
          message: 'JSON格式错误，请检查后再重新尝试格式化',
          type: 'warning'
        })
         return
      }
      
    }
  }
}
</script>