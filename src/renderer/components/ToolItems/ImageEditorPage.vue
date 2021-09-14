<template>
  <el-container>
    <el-header>
      <h4>图片编辑(loading......)</h4>
    </el-header>
    <el-main>
      <input type="file">
    </el-main>
  </el-container>
</template>
<script>
import { Cropper } from "cropperjs"

export default {
  name: 'image-editor',
  data() {
    return {
      imageUrl: ''
    };
  },
  methods: {
    buttonClick: function () {
      const image = document.getElementById('image');
      const cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}

</script>