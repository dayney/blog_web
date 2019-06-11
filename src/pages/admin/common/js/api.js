
import { instance, format } from './axios'
import { imgCompressor } from '../js/utils'
import Vue from 'vue'

// let baseUrl = 'http://94.191.48.194:7930'
let baseUrl = 'https://www.tuoke123.cn'
// let baseUrl = 'https://bird.ioliu.cn/v1?url=https://www.tuoke123.cn'

/**
 * 权限验证配置 TODOH
 * @export
 * @returns
 */
export function shareAuth (url) {
  return instance.get(`${baseUrl}/exploit_client/shareauth?url=${url}`).then(result => {
    if (!result || result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return {}
    }
    return result.data
  })
}

/** --------------------------------------支付------------------------------------- **/
/**
 * 支付
 * @export
 * @returns
 */
export function getPayInfo () {
  return instance.get(`${baseUrl}/exploit_client/get_recharge_info`).then(result => {
    console.log(result.error_code)
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  })
}

/**
 * 支付
 * @export
 * @returns
 */
export function pay (id) {
  return instance.get(`${baseUrl}/exploit_client/send_pay?recharge_id=${id}`).then(result => {
    console.log(result.error_code)
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  })
}

/** --------------------------------------个人信息------------------------------------- **/
/**
 * 获取个人信息
 * @export
 * @returns
 */
export function getUserInfo () {
  return instance.get(`${baseUrl}/exploit_client/user_info`).then(result => {
    console.log(result.error_code)
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return {owner_info: {}}
    }
    return result.data
  }).catch(ex => {
    return {owner_info: {}}
  })
}

/**
 * 上传个人信息
 * @export
 * @returns
 */
export function setUserInfo (data) {
  console.log(data)
  return instance.post(`${baseUrl}/exploit_client/user_info`, format(data)).then(result => {
    console.log(result.error_code)
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  })
}

/**
 * 上传个人信息的图片和二维码
 * @export
 * @returns
 */
export function setUserInfoImg (type, file) {
  Vue.$vux.loading.show()
  console.log(file)
  imgCompressor(file).then(compressFile => {
    console.log(compressFile)
    const data = new FormData()
    data.append('file', compressFile)
    data.append('img_type', type)
    return instance.post(`${baseUrl}/exploit_client/upload_img`, data, {headers: { 'Content-Type': 'multipart/form-data' }}).then(result => {
      Vue.$vux.loading.hide()
      console.log(result.error_code)
      if (result.error_code !== 0) {
        console.log('接口失败', JSON.stringify(result))
        return undefined
      }
      return result.data
    }).catch(ex => {
      Vue.$vux.loading.hide()
      console.log(`上传失败`, JSON.stringify(ex))
    })
  })
}

/** --------------------------------------爆文相关------------------------------------- **/
/**
 * 爆文列表
 * @export
 * @returns
 */
export function getHotList (page) {
  Vue.$vux.loading.show()
  let queryString = ''
  if (page) {
    queryString = `?page=${page}`
  }
  return instance.get(`${baseUrl}/exploit_client/hot${queryString}`).then(result => {
    console.log(result.error_code)
    Vue.$vux.loading.hide()
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  })
}

/**
 * 爆文搜索
 * @export
 * @param {*} key
 * @returns
 */
export function hotSearch (key, page) {
  return instance.get(`${baseUrl}/exploit_client/hot_search?key=${key}&page=${page}`).then(result => {
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  }).catch(ex => {
    console.log(`服务器错误`, JSON.stringify(ex))
    return []
  })
}

/**
 * 爆文详情页
 * @export
 * @param {*} key
 * @returns
 */
export function hotDetail (mode, articleid, owner) {
  let url = `mode=${mode}&article_id=${articleid}&type=hot`
  if (owner) {
    url = url + `&owner=${owner}`
  }
  Vue.$vux.loading.show()
  return instance.get(`${baseUrl}/exploit_client/hot_detail?${url}`).then(result => {
    Vue.$vux.loading.hide()
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  }).catch(ex => {
    console.log(`服务器错误`, JSON.stringify(ex))
    return {}
  })
}

/**
 * 朋友圈列表
 * @export
 * @returns
 */
export function getFriendsList (page) {
  let queryString = ''
  if (page) {
    queryString = `?page=${page}`
  }
  return instance.get(`${baseUrl}/exploit_client/material${queryString}`).then(result => {
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  })
}

/**
 * 朋友圈列表
 * @export
 * @returns
 */
export function copyMaterial (materialid) {
  return instance.get(`${baseUrl}/exploit_client/copy_material?material_id=${materialid}`).then(result => {
    return result && result.error_code
  })
}

/**
 * 智能创建爆文
 * @export
 * @returns
 */
export function createArticle (url, tag) {
  url = encodeURIComponent(url)
  Vue.$vux.loading.show()
  return instance.get(`${baseUrl}/exploit_client/hot_create?url=${url}&tag=${tag}`).then(result => {
    Vue.$vux.loading.hide()
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return result
    }
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    return {error_code: -1}
  })
}

/** --------------------------------------个人中心相关------------------------------------- **/

/**
 * 分享
 * @export
 * @param {*} imgData
 * @returns
 */
export function uploadShareImg (imgData) {
  return instance.post(`${baseUrl}/exploit_client/imgUpload`, format({ imgData: imgData })).then(result => {
    Vue.$vux.loading.hide()
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return result.error_code
    }
    return result.error_code
  }).catch(ex => {
    console.log(`服务器错误`, JSON.stringify(ex))
    return -1
  })
}

/**
 * 意见反馈
 * @export
 * @param {*} img
 * @param {*} txt
 * @returns
 */
export function feedback (img, txt, contact) {
  Vue.$vux.loading.show()
  if (img) {
    return imgCompressor(img).then(compressFile => {
      return go(compressFile)
    })
  }
  return go(img)

  function go (newimg) {
    const data = new FormData()
    data.append('txt', txt)
    data.append('img', newimg)
    data.append('contact', contact)

    return instance.post(
        `${baseUrl}/exploit_client/yjfk`,
        data,
        {headers: { 'Content-Type': 'multipart/form-data' }}
    ).then(result => {
      Vue.$vux.loading.hide()
      if (result.error_code !== 0) {
        console.log('接口失败', JSON.stringify(result))
        return result.error_code
      }
      return result.error_code
    }).catch(ex => {
      Vue.$vux.loading.hide()
      return -1
    })
  }
}

/**
 * 我的文章
 * @export
 * @param {*} page
 * @returns
 */
export function getMyArticles (page) {
  Vue.$vux.loading.show()
  let queryString = ''
  if (page) {
    queryString = `?page=${page}`
  }
  return instance.get(`${baseUrl}/exploit_client/hot${queryString}&self=1`).then(result => {
    console.log(result.error_code)
    Vue.$vux.loading.hide()
    if (result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
    return []
  })
}

/**
 * 删除文章
 * @param {*} id
 */
export function deleteArticle (id) {
  Vue.$vux.loading.show()
  const queryString = format({ id: id })
  return instance.get(`${baseUrl}/exploit_client/hot_del/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result.error_code
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
    return -1
  })
}

/**
 * 智能创建爆文
 * @export
 * @returns
 */
export function switchRemind (hotpush) {
  return instance.get(`${baseUrl}/exploit_client/hot_push?hot_push=${hotpush}`).then(result => {
    if (!result || result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return []
    }
    return result.data
  }).catch(ex => {
    console.log('服务器错误', JSON.stringify(ex))
  })
}

// #region 房源相关接口
/**
 * 手动发布房源
 * @param {*} houseInfo 房源信息
 */
export function publishHouse (houseInfo) {
  console.log(houseInfo)
  const { info_type, house_type, province, city, district, business, total_price, area, unit, introduction, img } = houseInfo
  Vue.$vux.loading.show()
  return Promise.all(img.map(file => imgCompressor(file))).then(compressFiles => {
    return instance.post(
      `${baseUrl}/exploit_client/house_pub`,
      // data,
      format({ info_type, house_type, province, city, district, business, total_price, area, unit, introduction, img: compressFiles })
      // {headers: { 'Content-Type': 'multipart/form-data' }}
    ).then(result => {
      Vue.$vux.loading.hide()
      if (result.error_code !== 0) {
        console.log('接口失败', JSON.stringify(result))
        // return []
      }
      console.log('publish result: ', result)
      return result
    }).catch(ex => {
      Vue.$vux.loading.hide()
    })
  })
}

/**
 * 智能发布粘贴URL生成
 * @param {*} url 链接
 */
export function pubUrl (url = '') {
  Vue.$vux.loading.show()
  const queryString = format({ url })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/house_pub_url?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 智能发布二维码生成
 * @param {String} qrcode 二维码扫描结果
 */
export function pubQRCode (qrcode = '') {
  Vue.$vux.loading.show()
  const queryString = format({ qrcode })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/house_pub_qrcode?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 智能发布上传二维码图片
 * @param {File} img 二维码图片
 */
export function pubQRImg (img) {
  Vue.$vux.loading.show()
  return imgCompressor(img).then(compressFile => {
    console.log(compressFile)
    const data = new FormData()
    data.append('img', compressFile)

    return instance.post(
      `${baseUrl}/exploit_client/house_pub_qrimg`,
      data,
      {headers: { 'Content-Type': 'multipart/form-data' }}
    ).then(result => {
      Vue.$vux.loading.hide()
      return result
    }).catch(err => {
      Vue.$vux.loading.hide()
      console.log('服务器错误', JSON.stringify(err))
    })
  })
}

/**
 * 我的房源(和搜索共用)
 * @param {String | Number} page 当前页
 * @param {String} key 搜索关键字
 */
export function getMyHouseList (page = '', key = '') {
  Vue.$vux.loading.show()
  const queryString = format({ page, key })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/my_house/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    if (!result || result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
    }
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 获取房源详细信息
 * @param {*} id 房源 id
 */
export function getHouseDetail (id) {
  const queryString = format({ id, type: 'house' })
  console.log(queryString)
  Vue.$vux.loading.show()
  return instance.get(`${baseUrl}/exploit_client/house_detail/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    if (!result || result.error_code !== 0) {
      console.log('接口失败', JSON.stringify(result))
      return {}
    }
    return result.data
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 删除我的房源
 * @param {*} houseId 房源 id
 */
export function deleteHouse (houseId = '') {
  Vue.$vux.loading.show()
  const queryString = format({ house_id: houseId })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/house_del/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}
// #endregion

// #region 访问数据统计相关接口

/**
 * 获取房源/文章列表
 * @param {*} type hot是文章，house是房源
 * @param {*} page 当前页
 */
export function getPageviewsList (type = '', page = '') {
  Vue.$vux.loading.show()
  const queryString = format({ type, page })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/view_list/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 获取访客数据列表
 * @param {*} page 当前页
 */
export function getVisitorList (page = '') {
  Vue.$vux.loading.show()
  const queryString = format({ page })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/visitor_list/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 获取访问详情(文章、房源)
 * @param {*} type hot是文章，house是房源
 * @param {*} id 文章或房源id
 */
export function getPageviewsDetail (type = '', id = '') {
  Vue.$vux.loading.show()
  const queryString = format({ type, id })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/view_detail/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}

/**
 * 获取访客详情
 * @param {*} id 访客id
 */
export function getVisitorDetail (id = '') {
  Vue.$vux.loading.show()
  const queryString = format({ id })
  console.log(queryString)
  return instance.get(`${baseUrl}/exploit_client/visitor_detail/?${queryString}`).then(result => {
    Vue.$vux.loading.hide()
    return result
  }).catch(ex => {
    Vue.$vux.loading.hide()
    console.log('服务器错误', JSON.stringify(ex))
  })
}
// #endregion
/**
 * 心跳
 * @export
 * @param {*} type
 * @param {*} id
 * @returns
 */
export function ping (type, id) {
  const queryString = format({ id: id, type: type })
  return instance.get(`${baseUrl}/exploit_client/ping/?${queryString}`).then(result => {
    return result && result.error_code
  }).catch(ex => {
    console.log('服务器错误', JSON.stringify(ex))
    return -1
  })
}

/**
 * 分享回调
 * @export
 * @param {*} type
 * @param {*} id
 * @returns
 */
export function shareCallback (type, id) {
  const queryString = format({ id: id, type: type })
  return instance.get(`${baseUrl}/exploit_client/share_callback/?${queryString}`).then(result => {
    return result && result.error_code
  }).catch(ex => {
    console.log('服务器错误', JSON.stringify(ex))
    return -1
  })
}
