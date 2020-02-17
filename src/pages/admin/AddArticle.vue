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

      <el-form-item label="上线时间">
        <el-col :span="3">
          <el-date-picker
            type="datetime"
            placeholder="选择文章上线日期时间"
            v-model="article.publishTime"
           class="k-w-200 k-fl"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="文章状态">
        <el-select v-model="article.status" class="k-w-200 k-fl">
          <el-option label="发布" value="publish"></el-option>
          <el-option label="冻结" value="freeze"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章分类">
        <el-select v-model="article.categoryId" @change="getTagList" placeholder="请选择文章分类" class="k-w-200 k-fl">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章标签">
        <el-checkbox-group v-model="selectedTagIds" class="k-fl">
          <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
        </el-checkbox-group>
        <!-- <el-checkbox-group v-model="selectedTagIds">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group> -->
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
  name: 'AddArticle',
  components: {
    quillEditor
  },
  data () {
    return {
      tagList: '',
      instro: '', // 文章简述
      content: '', // 文章内容
      selectedTagIds: [], // 被选中的标签数组
      categoryList: [], // 分类标签
      article: {
        title: '',
        categoryId: '',
        publishTime: '',
        status: '',
        tagIds: '',
        instro: '',
        content: ''
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.getCategoryList().then(result => {
        if (result.status === 'success') {
          this.categoryList = result.data.categoryList
        }
      }).catch((error) => {
        error && console.error(error)
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
    onSubmit () {
      let date = new Date(this.article.publishTime)
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

      this.article.publishTime = currentdate
      this.article.instro = escape(this.instro)
      this.article.content = escape(this.content)
      this.article.tagIds = this.selectedTagIds.join(',')

      this.$api.addArticle(this.article).then((result) => {
        if (result.status === 'success') {
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
