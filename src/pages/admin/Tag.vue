<template>
  <div class="k-tag-container">
    <el-row type="flex" :gutter="0" class="k-operate-header">
      <el-col type="flex" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="k-button-group">
          <el-button type="primary" @click="addTag">新增标签</el-button>
        </div>
      </el-col>

      <el-col type="flex" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form :inline="true" :model="searchForm" class="k-search-tag">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="请输入标签名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchTag">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="k-table-wrap">
      <div class="k-table-container">
        <el-table :data="tableData" style="width: 100%" class="k-table-tag-list">
          <el-table-column
            fixed
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column fixed prop="name" :show-overflow-tooltip="true" label="标签名" width="120"></el-table-column>
          <el-table-column prop="authorName" label="创建者" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width="150"></el-table-column>
          <el-table-column prop="status" label="当前状态" align="center" :formatter="statusFormatter" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="220">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="danger"
                size="mini"
              >移除</el-button>
              <el-button
                @click.native.prevent="editRow(scope.row)"
                type="button"
                size="mini"
              >编辑</el-button>
              <el-button
                @click.native.prevent="lockRow(scope.row)"
                type="danger"
                size="mini"
                v-if="scope.row.status ===1"
              >冻结</el-button>
              <el-button
                @click.native.prevent="unlockRow(scope.row)"
                type="warning"
                size="mini"
                v-if="scope.row.status ===0"
              >解冻</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="k-pagination">
        <el-row :gutter="10" class="k-operate-group">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from './mixins'

export default {
  name: 'Tag',
  mixins: [Pagination],
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.initTagList()
  },
  methods: {
    addTag () {
      // console.log('新增标签')
      this.$router.push({
        path: `/admin/article/addTag`
      })
    },
    searchTag () {
      console.log('查询标签')
      let temObj = {
        page: this.pageNo,
        limit: this.pageSize
      }
      if (this.searchForm.name) {
        temObj.name = this.searchForm.name
      }
      this.$api.findOneTag(temObj)
        .then((result) => {
          console.log(result, 'result')
          if (result.status === 'success') {
            // console.log('==============')
            // console.log(result.data.tagInfo)
            // console.log('==============')
            this.tableData = result.data.tagList
            this.total = result.data.total
            // this.tag.name = response.data.tagInfo.name
            // this.tag.id = response.data.tagInfo.id
            // this.tag.authorId = response.data.tagInfo.authorId
            // this.tag.status = Boolean(response.data.tagInfo.status)
          }
        })
        .catch((error) => {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    },
    initTagList () {
      let temObj = {
        page: this.pageNo,
        limit: this.pageSize
      }

      this.$api.getTagList(temObj).then(result => {
        if (result.status === 'success') {
          if (result.data.tagList && result.data.tagList.length > 0) {
            this.tableData = result.data.tagList
            this.total = result.data.total
          }
        }
      })
    },
    deleteRow (tagInfo) {
      this.$confirm(`标签【${tagInfo.name}】将永久删除该文件, 是否继续?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api
          .delTag({
            id: tagInfo.id
          })
          .then(result => {
            if (result.status === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initTagList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editRow (tagInfo) {
      this.$router.push({
        path: `/admin/article/editTag/${tagInfo.id}`
      })
    },
    lockRow (tagInfo) {
      this.$confirm(`标签【${tagInfo.name}】将被冻结, 是否继续?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api
          .isLockTag({
            lock: true,
            id: tagInfo.id
          })
          .then(result => {
            if (result.status === 'success') {
              this.$message({
                type: 'success',
                message: '冻结标签成功!'
              })
              this.initTagList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '冻结标签失败'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    unlockRow (tagInfo) {
      this.$api
        .isLockTag({
          lock: false,
          id: tagInfo.id
        })
        .then(result => {
          if (result.status === 'success') {
            this.$message({
              type: 'success',
              message: '冻结标签成功!'
            })
            this.initTagList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '冻结标签失败'
          })
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.dispatchSelect()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.dispatchSelect()
    },
    dispatchSelect () {
      if (this.searchForm.name) {
        this.searchTag()
      } else {
        this.initTagList()
      }
    },
    statusFormatter (row, column, cellValue, index) {
      let temObj = {
        0: '冻结',
        1: '正常'
      }
      return temObj[cellValue]
    }
  }
}
</script>

<style lang="less">
.k-tag-container {
  position: relative;
  width: 100%;
  height: 100%;
  .k-operate-header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    z-index: 1000;
    margin-bottom: 10px;
    .k-button-group {
      padding: 0 15px;
      .el-button {
        float: left;
      }
    }
    .k-search-tag {
      float: right;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .k-table-wrap {
    overflow: auto;
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    .k-table-container {
      overflow-y: auto;
      width: 100%;
      height: 578px;
      min-height: 578px;
      max-height: 800px;
    }
    .k-cell-num .cell {
      text-align: center;
    }
    .k-pagination {
      width: 100%;
      background-color: #fff;
      .el-pagination {
        padding: 5px 0;
      }
    }
  }
}
</style>
