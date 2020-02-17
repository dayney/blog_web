/**
 * 组件混入封装
 * 实现功能：滚动到指定图表顶部位置
 * @param id 视图id
 * @param topSpace 加载更多组件距离顶部距离
 */
export const Pagination = {
  data () {
    return {
      total: 0, // 用户总记录数
      pageSize: 10, // 每页有多少条
      pageSizes: [10, 20, 50, 100], // 每页有多少条
      pageNo: 1, // 当前页码
      searchForm: { // 查询条件
        name: ''
      }
    }
  }
}

/**
 * 组件混入封装
 * 实现功能：重置data的数据
 */
export const mixMethods = {
  methods: {
    resetDefaultData () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
