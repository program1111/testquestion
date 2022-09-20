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
    return axios.post(base.addTest, params, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(res => {
      return res
    }, err => {
      return err.response
    })
  },
  getAllTest (currentPage, pageSize, params) {
    var param
    if (params === undefined) {
      param = base.getAllTest + '/' + currentPage + '/' + pageSize
    } else {
      param = base.getAllTest + '/' + currentPage + '/' + pageSize + '?stem=' + params
    }
    return axios.get(param).then(res => {
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
  },
  updateTimu (params) {
    return axios.post(base.updateTimu, params, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(res => {
      return res
    }, err => {
      return err.response
    })
  },
  deleteDetail (param) {
    return axios.post(base.deleteDetail, param, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(res => {
      return res
    }, err => {
      return err.response
    })
  },
  importTimu (param) {
    return axios.post(base.importTimu, param, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(res => {
      return res
    }, err => {
      return err.response
    })
  }

}

export default api
