<template>
    <el-row>
      <el-col :span="20">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-col>
      <el-col :offset="1" :span="3">
        <el-button @click="handleJsonFormat">格式化</el-button>
      </el-col>
      <el-col :span="24" style="margin-top:10px;">
        <div id="jsoneditor" style="width: 100%; height: 485px;"></div>
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
        mode: "code",
        modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
        onError: function (err) {
          this.$message({
            showClose: true,
            message: err.toString(),
            type: 'warning'
          })
        }
      };
      var editor = new this.$jsoneditor(container, options)
      this.jsonEditor = editor
    },
    handleJsonFormat: function () {
      if (this.textarea.trim() === '') {
         this.$message.error('当前JSON内容为空！')
         return
       }
       try {
         let detail = JSON.parse(this.textarea)
         if (detail != undefined) {
           this.jsonEditor.set(detail)
         }
       } catch (e) {
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