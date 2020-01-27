<template>
  <div class="k-article-container">
    <el-form
    ref="articleForm"
    :model="article"
    label-width="100px"
    label-position="left"
    >
      <el-form-item label="文章名称">
        <el-input
        v-model="article.title"
        :clearable="true"
        class="k-w-200 k-fl"
        placeholder="请输入文章名"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章分类">
        <el-select v-model="article.category" placeholder="请选择文章分类" class="k-w-200 k-fl">
          <el-option label="生活" value="life"></el-option>
          <el-option label="技术" value="technology"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上线时间">
        <el-col :span="3">
          <el-date-picker
            type="datetime"
            placeholder="选择文章上线日期时间"
            v-model="article.releaseDate"

           class="k-w-200 k-fl"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="文章状态">
        <el-select v-model="article.status" class="k-w-200 k-fl">
          <el-option label="发布" value="publish"></el-option>
          <el-option label="冻结" value="freeze"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章标签">
        <el-checkbox-group v-model="selectedTags" class="k-fl">
          <el-checkbox v-for="tag in tagList" :label="tag.name" :key="tag.id"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="文章简介" class="k-quill-editor">
        <el-input type="textarea" v-model="instro"></el-input>
      </el-form-item>

      <el-form-item label="文章内容" class="k-quill-editor">
        <quill-editor
          v-model="content"
          @blur="onEditorBlur"
        ></quill-editor>
      </el-form-item>

      <el-form-item class="k-fl">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
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
  name: 'EditArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      tagList: '',
      instro: '', // 文章简述
      content: '', // 文章内容
      selectedTags: [], // 被选中的标签数组
      article: {
        title: '',
        category: '',
        releaseDate: '',
        status: '',
        tags: '',
        instro: '',
        content: ''
      }
    }
  },
  created () {
    this.$api.getTagList()
      .then((data) => {
        console.log(data, 'getTagList res')
        // let data = res.data
        // if (data.status === 'success') {
        this.tagList = data.tagList
        // }
      })
      .catch((error) => {
        error && console.error(error)
      })
  },
  methods: {
    onSubmit () {
      let date = new Date(this.article.releaseDate)
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let Hours = date.getHours()
      let Minutes = date.getMinutes()
      let Seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }

      if (Hours >= 0 && Hours <= 9) {
        Hours = '0' + Hours
      }

      if (Minutes >= 0 && Minutes <= 9) {
        Minutes = '0' + Minutes
      }

      if (Seconds >= 0 && Seconds <= 9) {
        Seconds = '0' + Seconds
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + Hours + ':' + Minutes + ':' + Seconds
      this.article.releaseDate = currentdate

      this.article.instro = escape(this.instro)
      this.article.content = escape(this.content)

      let temTagIds = []
      this.selectedTags && this.selectedTags.forEach((val) => {
        this.tagList.forEach((value) => {
          if (val === value.name) {
            temTagIds.push(value.id)
          }
        })
      })

      this.article.tags = temTagIds.join(',')

      this.$api.addArticle(this.article).then((res) => {
        if (res && res.insertId) {
          this.$router.push({
            path: '/admin/article/articleList'
          })
        }
      }).catch((error) => {
        console.log('捕获的错误')
        console.log(error)
        console.log('捕获的错误')
      })
    },
    onEditorBlur () {
      this.article.content = escape(this.content)
    }
  }
}
</script>

<style lang="less">

.k-article-container {
  padding: 10px;
  .k-w-200 {
    width: 200px;
  }
  .k-fl {
    float: left;
  }

  .k-quill-editor .el-form-item__content {
    line-height: unset;
    .ql-editor {
      min-height: 400px;
    }
  }
}
</style>
