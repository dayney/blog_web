<template>
  <div class="k-articles-container">
    <el-table
    :data="tableData"
    style="width: 100%"
    :stripe="true"
    height="550">
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="instro"
        label="简述"
        width="300">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="category"
        :formatter="categoryText"
        label="分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="like"
        label="点赞"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="handleUpdate(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      tableData: [
        {
          id: 1,
          title: '标题1',
          instro: '描述1描述1',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 2,
          title: '标题2',
          instro: '描述2描述2',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'technology',
          like: 123
        },
        {
          id: 3,
          title: '标题3',
          instro: '描述3描述3',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 4,
          title: '标题4',
          instro: '描述4描述4',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 5,
          title: '标题5',
          instro: '描述5描述5',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 6,
          title: '标题6',
          instro: '描述6描述6',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 7,
          title: '标题7',
          instro: '描述7描述7',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 8,
          title: '标题8',
          instro: '描述8描述8',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 9,
          title: '标题9',
          instro: '描述9描述9',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          id: 10,
          title: '标题10',
          instro: '描述10描述10',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        },
        {
          title: '标题11',
          instro: '描述11描述11',
          name: '王小虎',
          createTime: '2020-01-19',
          publishTime: '2020-01-19',
          category: 'life',
          like: 123
        }
      ],
      total: 0, // 用户总记录数
      pageSize: 10, // 每页有多少条
      pageSizes: [10, 20, 50, 100], // 每页有多少条
      pageNo: 1, // 当前页码
      userList: [], // 用户列表信息,初始化的数据格式要与组件里面的check保持一致
      multipleSelection: [], // 获取用户选中的数据
      searchForm: { // 查询条件
        name: ''
      }
    }
  },
  create () {
    this.initData()
  },
  methods: {
    initData () {
      this.$api.getArticleList({
        page: this.pageNo,
        limit: this.pageSize
      }).then(res => {
        console.log(res, 'res')
      })
      console.log('execute initData')
    },
    handleView (id) {
      console.log(`handleView handleView handleView currentId:: ${id}`)
      this.$router.push({
        path: '/admin/article/articleDetails',
        query: {
          id
        }
      })
    },
    handleUpdate (currentId) {
      console.log('handleUpdate handleUpdate handleUpdate')
      console.log(currentId, 'currentId')
    },
    handleDelete (currentId) {
      console.log('当前的文章id是::')
      console.log(currentId, 'currentId')
    },
    categoryText (val) {
      // console.log(val, 'val')
      const NAME = {
        life: '生活',
        technology: '科技'
      }
      return NAME[val.category]
    }

  }
}
</script>

<style lang="less">

</style>
