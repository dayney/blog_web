<template>
  <div class="k-user-container">
    <el-table
      ref="multipleTable"
      :data="userList"
      tooltip-effect="dark"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="55" :class-name="'k-cell-num'">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="注册日期" width="120">
        <template slot-scope="scope">{{ scope.row.registerTime }}</template>
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
      userList: '', // 用户列表信息
      multipleSelection: []
    }
  },
  created () {
    this.initUserList()
  },
  methods: {
    initUserList () {
      console.log('初始化用户列表数据')
      let self = this
      this.$http.get('/api/getUserList')
        .then(function (response) {
          if (response.data.status === 'success') {
            console.log('response>>>>')
            console.log(response.data.data.userList)
            console.log('response>>>>')
            self.userList = response.data.data.userList
          }
        })
        .catch(function (error) {
          console.log('捕获的错误')
          console.log(error)
          console.log('捕获的错误')
        })
    },
    tableRowClassName ({row, rowIndex}) {
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
      console.log('删除功能')
      // rows.splice(index, 1)
    },
    editRow (index, rows) {
      console.log('编辑功能')
    },
    lockRow (index, rows) {
      console.log('冻结功能')
    }
  }
}
</script>

<style lang="less">
.k-user-container .k-cell-num .cell {
  text-align: center;
}
</style>
