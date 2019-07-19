import axios from 'axios'

let instance = axios.create({})

const generateApiMap = (map) => {
  let temObj = {}
  map && map.forEach((val) => {
    for (let key in val) {
      let method = val[key].method // 当前只支持get

      temObj[key] = (params = {}) => {
        if (Object.keys(params).length < 1) {
          return instance[method](val[key].url)
        } else {
          return instance[method](
            val[key].url,
            {
              params
            }
          )
        }
      }
    }
  })

  return temObj
}

export default {
  generateApiMap
}
