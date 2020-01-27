<template>
  <div>
    promise加深学习
    <button>Notify me!</button>
  </div>
</template>

<script>
export default {
  mounted () {
    window.addEventListener('load', function () {
      // 首先，让我们检查我们是否有权限发出通知
      // 如果没有，我们就请求获得权限
      if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
          if (Notification.permission !== status) {
            Notification.permission = status
          }
        })
      }

      var button = document.getElementsByTagName('button')[0]

      button.addEventListener('click', function () {
        // 如果用户同意就创建一个通知
        if (window.Notification && Notification.permission === 'granted') {
          // eslint-disable-next-line no-unused-vars
          var n = new Notification('Hi!')
          // eslint-disable-next-line brace-style
        }

        // 如果用户没有选择是否显示通知
        // 注：因为在 Chrome 中我们无法确定 permission 属性是否有值，因此
        // 检查该属性的值是否是 "default" 是不安全的。
        else if (window.Notification && Notification.permission !== 'denied') {
          Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
              Notification.permission = status
            }

            // 如果用户同意了
            if (status === 'granted') {
              // eslint-disable-next-line no-unused-vars
              var n = new Notification('Hi!')
              // eslint-disable-next-line brace-style
            }

            // 否则，我们可以让步的使用常规模态的 alert
            else {
              alert('Hi!')
            }
          })
        // eslint-disable-next-line brace-style
        }

        // 如果用户拒绝接受通知
        else {
          // 我们可以让步的使用常规模态的 alert
          alert('Hi!')
        }
      })
    })

    let demo = new Promise((resolve, reject) => {
      resolve(100)
    })

    console.log('demo')
    demo.then((res) => {
      console.log(res)
    })
    console.log('demo')
  }
}
</script>

<style lang="less"></style>
