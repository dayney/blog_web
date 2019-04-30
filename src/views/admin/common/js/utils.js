
/**
 * 深拷贝
 * @export
 * @param {Any} data
 * @returns
 */
export function deepCopy (data) {
  let data_
  try {
    data_ = JSON.parse(JSON.stringify(data))
  } catch (ex) {
    console.log(`parse_err${JSON.stringify(ex)}`)
  }
  return data_
}

export function imgCompressor (file) {
  return new Promise((resolve, reject) => {
    // 压缩图片需要的一些元素和对象
    let reader = new FileReader()
    let img = new Image()

    // 缩放图片需要的canvas
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')

    // base64地址图片加载完毕后
    img.onload = function () {
      // 图片原始尺寸
      let originWidth = this.width
      let originHeight = this.height
      // 最大尺寸限制（可以按照业务场景定义多个，这个后面扩展） TODOH
      let maxWidth = 400
      let maxHeight = 400
      // 目标尺寸
      let targetWidth = originWidth
      let targetHeight = originHeight
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        }
      }

      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      // canvas转为blob并上传
      var newImg = canvas.toDataURL('image/png')
      resolve(newImg)
      // canvas.toBlob(function (blob) {
      //   // 返回blob
      //   resolve(blob)
      // }, file.type || 'image/png')
    }

    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function (e) {
      img.src = e.target.result
    }

    if (file.type.indexOf('image') === 0) {
      reader.readAsDataURL(file)
    }
  })
}
