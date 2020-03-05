<template>
  <div class="k-about-container">
    <el-form
      ref="tagform"
      label-width="100px"
    >
      <el-form-item label="作者图像">
        <el-upload
          class="k-upload-zone"
          action="123"
          name="pho"
          :show-file-list="false"
          :before-upload="beforeUpload">
          <img v-if="adminUrl" :src="adminUrl" class="k-avatar">
          <i v-else class="el-icon-plus k-upload-zone-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="作者描述" class="k-quill-editor">
        <quill-editor
          v-model="content"
        ></quill-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="!isSubmit" @click="onSubmit">保存</el-button>
        <el-button native-type="reset">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'About',
  components: {
    quillEditor
  },
  data () {
    return {
      adminUrl: '',
      content: '' // 作者信息
    }
  },
  created () {
    this.initData()
  },
  computed: {
    isSubmit: function () {
      if (this.content && this.adminUrl) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    initData () {
      this.$api.getAdminInfo().then(result => {
        if (result.status === 'success') {
          this.adminUrl = result.data.adminUrl
          this.content = result.data.content
        }
      })
    },
    getTagList () {
      this.$api.findCategoryTag({
        categoryId: this.article.categoryId
      })
        .then((result) => {
          if (result.status === 'success') {
            this.tagList = result.data.tagList
          }
        })
        .catch((error) => {
          error && console.error(error)
        })
    },
    beforeUpload (file) {
      let fd = new FormData()
      fd.append('pho', file)
      this.$api.uploadsAbout(fd).then((result) => {
        if (result.status === 'success') {
          this.adminUrl = result.data.adminUrl
        }
      })
      return false
    },
    onSubmit () {
      let result = this.check()

      if (result) {
        this.$message.error(result)
      }

      this.$api.setAdminInfo({
        adminUrl: this.adminUrl,
        content: this.content
      })
    },
    check () {
      if (!this.adminUrl) {
        return '请上传作者图片'
      }
      if (!this.content) {
        return '请编辑作者简介'
      }
      return ''
    }
  }
}
</script>

<style lang="less">
.k-about-container {
  padding: 10px;
  .k-w-200 {
    width: 200px;
  }
  .k-fl {
    float: left;
  }
  @avatarSize: 100px;
  .k-upload-zone {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: @avatarSize;
    height: @avatarSize;
    background-color: #fbfdff;
  }

  .k-avatar {
    width: @avatarSize;
    height: @avatarSize;
  }

  .k-upload-zone-icon {
    font-size: 32px;
    color: #8c939d;
    width: @avatarSize;
    height: @avatarSize;
    line-height: @avatarSize;
    text-align: center;
  }

  .k-quill-editor .el-form-item__content {
    line-height: unset;
    .ql-editor {
      min-height: 200px;
    }
  }
}
</style>
