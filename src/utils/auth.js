import Cookies from 'js-cookie'
// npm install --save js-cookie
// const TokenKey = 'Admin-Token'
export function getToken (TokenKey) {
  return Cookies.get(TokenKey)// 获取指定名称的cookie
}
export function setToken (TokenKey, token) {
  return Cookies.set(TokenKey, token)// 创建一个名称为name，对应值为value的cookie，由于没有设置失效时间，默认失效时间为该网
}
// 创建一个有效时间为7天的cookie
// Cookies.set(name, value, { expires: 7 })
export function removeToken (TokenKey) {
  return Cookies.remove(TokenKey)// 删除指定名称的cookie
}
