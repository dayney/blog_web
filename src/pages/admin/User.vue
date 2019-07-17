<template>
  <div class="k-user-container">
    <el-row :gutter="10" class="k-operate-group">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
        <el-button type="danger" @click="batchDeletion">批量删除</el-button>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-button type="primary" @click="exportExcel">下载</el-button>
      </el-col>
    </el-row>

    <div class="k-table-container">
      <el-table
        ref="multipleTable"
        :data="userList"
        :default-sort="{prop: 'date', order: 'descending'}"
        tooltip-effect="dark"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="55" :class-name="'k-cell-num'">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
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
              @click.native.prevent="editRow(scope.row.id, userList)"
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

      <el-row :gutter="10" class="k-operate-group">
        此处是准备做分页的
      </el-row>
    </div>

    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([userList[1], userList[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      userList: [], // 用户列表信息,初始化的数据格式要与组件里面的check保持一致
      multipleSelection: []
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
      console.log('加载用户数据列表')
      let temObj = {
        page: 1,
        limit: 10
      }

      let userList = await this.$http
        .get('/api/getUserList', {
          params: temObj
        })
        .then(function (response) {
          let data = response.data
          if (data.status === 'success') {
            return data.data.userList
          }
        })
        .catch(function (error) {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })

      this.userList = userList
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
      let self = this
      console.log('删除功能')
      console.log('index::' + index)
      // rows.splice((index - 1), 1) // 纯前端删除
      console.log('index::' + index)
      this.$http
        .delete(`/api/delUser/${index}`)
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
    editRow (index, rows) {
      console.log('编辑功能')
    },
    lockRow (index, rows) {
      let self = this
      this.$http
        .delete(`/api/lockUser/${index}`)
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
    batchDeletion () {
      let self = this
      let ids = []

      this.multipleSelection &&
        this.multipleSelection.forEach(val => {
          val.id && ids.push(val.id)
        })

      this.$http
        .delete(`/api/multipleDelUser/${ids.join(',')}`)
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
      // this.$http
      //   .get('/api/excel', {
      //     params: {
      //       filename: '用户表'
      //     }
      //   })
      //   .then(function (response) {
      //     let data = response.data
      //     if (data.status === 'success') {
      //       return data.data.userList
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log('捕获的错误')
      //     console.log(error)
      //     console.log('捕获的错误')
      //   })
    }
  }
}
</script>

<style lang="less">
.k-user-container {
  .k-operate-group {
    margin-bottom: 10px;
  }
  .k-table-container {
    overflow: hidden;
    width: 100%;
    height: 740px;
  }
  .k-cell-num .cell {
    text-align: center;
  }
}
</style>
