<template>
  <div class="k-user-container">
    <el-row type="flex" :gutter="0" class="k-operate-header">
      <el-col type="flex" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="k-button-group">
          <el-button type="primary" @click="exportExcel">下载</el-button>
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </div>
      </el-col>

      <el-col type="flex" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form :inline="true" :model="searchForm" class="k-search-user">
          <el-form-item>
            <el-input v-model="searchForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSubmit">查询</el-button>
            <el-button type="primary" @click="initUserList">所有</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="k-table-wrap">
      <div class="k-table-container">
        <el-table
          ref="multipleTable"
          :data="userList"
          :default-sort="{prop: 'date', order: 'descending'}"
          tooltip-effect="dark"
          style="width: 100%"
          height="630"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="55" :class-name="'k-cell-num'">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="注册日期" sortable width="120">
            <template slot-scope="scope">{{ scope.row.registerTime | cusDate }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="手机号码" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.row.id, userList)"
                type="text"
                size="small"
              >移除</el-button>
              <el-button
                @click.native.prevent="editRow(scope.row.id)"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                @click.native.prevent="lockRow(scope.row.id, userList)"
                type="text"
                size="small"
              >冻结</el-button>
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
        <!-- <el-button @click="toggleSelection([userList[1], userList[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from './mixins'

export default {
  name: 'User',
  mixins: [Pagination],
  data () {
    return {
      userList: [], // 用户列表信息,初始化的数据格式要与组件里面的check保持一致
      multipleSelection: [] // 获取用户选中的数据
    }
  },
  filters: {
    cusDate (val) {
      let date = new Date(val)
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }

      return year + seperator1 + month + seperator1 + strDate
    }
  },
  created () {
    this.initUserList()
  },
  methods: {
    async initUserList () {
      this.searchForm.name = '' // 清空插叙条件

      let temObj = {
        page: this.pageNo,
        limit: this.pageSize
      }

      let { userList, total } = await this.$api.getUserList(temObj)
        .then((result) => {
          if (result.status === 'success') {
            return result.data
          }
        })
        .catch((error) => {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })

      this.userList = userList
      this.total = total
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteRow (index, rows) {
      // let self = this
      let currentUser = rows.filter(val => {
        return index === val.id
      })
      console.log(currentUser, 'currentUser')
      // rows.splice((index - 1), 1) // 纯前端删除
      console.log('index::' + index)
      this.$confirm(`用户【${currentUser[0].name}】将永久删除该文件, 是否继续?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api
          .delUser({
            id: index
          })
          .then(response => {
            let data = response.data
            if (data.status === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initUserList()
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
    editRow (index) {
      console.log('编辑功能')
      this.$router.push({
        path: `/admin/user/editUser/${index}`
      })
    },
    lockRow (index, rows) {
      let currentUser = rows.filter(val => {
        return index === val.id
      })
      this.$confirm(`用户【${currentUser[0].name}】将被冻结, 是否继续?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .delete(`/api/lockUser/${index}`)
          .then((response) => {
            let data = response.data
            if (data.status === 'success') {
              this.$message({
                type: 'success',
                message: '冻结成功!'
              })
              this.initUserList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '冻结成功!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    batchDeletion () {
      console.log('batchDeletion...')
      let self = this
      let ids = []

      this.multipleSelection &&
        this.multipleSelection.forEach(val => {
          val.id && ids.push(val.id)
        })

      this.$api.multipleDelUser({ids: ids.join(',')})
        .then(function (response) {
          let data = response.data
          if (data.status === 'success') {
            self.initUserList()
          }
        })
        .catch(function (error) {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    },
    exportExcel () {
      console.log('导出Excel文件')
      console.log(window.location)
      window.location = window.location.origin + '/api/excel/' + '用户表' // 这里不能使用get方法跳转，否则下载不成功
    },
    handleSizeChange (val) {
      console.log(`handleSizeChange每页 ${val} 条`)
      this.pageSize = val
      this.initUserList()
    },
    handleCurrentChange (val) {
      console.log('handleCurrentChange触发页码')
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.initUserList()
    },
    addUser () {
      this.$router.push({
        path: '/admin/user/addUser'
      })
    },
    searchSubmit () {
      let self = this
      if (!this.searchForm.name) return

      this.$api.searchUser({name: this.searchForm.name})
        .then(function (response) {
          self.$store.commit('initRequestedNumber')
          self.userList = response.userList
        })
        .catch(function (error) {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    }
  }
}
</script>

<style lang="less">
.k-user-container {
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
    .k-search-user {
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
      height: 618px;
      min-height: 618px;
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
