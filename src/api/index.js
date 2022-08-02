import axios from 'axios'
import base from './base'
const api = {
  getGoodsList (params) {
    axios.get(base.goodsList).then(
      res => {
        console.log('请求成功', res)
      },
      error => {
        console.log('请求失败', error, base.goodsList)
      })
    return axios.get(base.goodsList, {
      params
    })
  },
  checkLogin (params) { // 判断用户名与密码是否正确
    return axios.post(base.loginJudge, {
      params
    }).then(
      res => {
        return res.data
      },
      error => {
        return error
      })
  }

}

export default api
