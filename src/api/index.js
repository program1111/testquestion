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
    return axios.post(base.loginJudge,
      params
      , { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(
      res => {
        return res
      },
      error => {
        return error.response
      })
  },

  addTest (params) {
    console.log(params, '添加题目数据')
    return axios.post(base.addTest, params, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(res => {
      console.log(res, '添加题目数据')
      return res
    }, err => {
      console.log(err, '添加题目数据')
      return err.response
    })
  },
  getAllTest (currentPage, pageSize) {
    return axios.get(base.getAllTest + '/' + currentPage + '/' + pageSize).then(res => {
      console.log(res.data, '得到题目数据')
      return res
    }, err => {
      return err.response
    })
  },
  getAllTestOptions () {
    return axios.get(base.getAllTestOptions).then(res => {
      return res
    }, err => {
      return err.response
    })
  }

}

export default api
