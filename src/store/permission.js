import { asyncRouterMap, constantRouterMap } from '../router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    topRouters: [],
    topTitle: '',
    menuIndex: 0
  },
  getters: {
    permission_routers: state => state.routers, // 所有路由
    addRouters: state => state.addRouters, // 权限过滤路由
    topRouters: state => state.topRouters, // 顶部三级路由
    topTitle: state => state.topTitle, // 顶部的title
    menuIndex: state => state.menuIndex // 顶部菜单的index
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 权限路由
      state.routers = constantRouterMap.concat(routers) // 总路由
    },
    CLICK_INNER_LEFT_MENU: (state, data) => { // titleList:arr
      state.topRouters = data.titleList
    },
    CLICK_TOP_MENU: (state, data) => {
      state.topTitle = data.title
      state.menuIndex = data.menuIndex
    }
  },
  actions: {
    // 根据角色，重新设置权限路由;并保存到vuex中,SET_ROUTERS;
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const roles = data.roles
        let accessedRouters = ''
        if (roles.indexOf('admin') >= 0) {
          // 如果是管理员，直接将权限路由赋值给新路由;
          accessedRouters = asyncRouterMap
        } else {
          // 非管理员用户,如roles:['editor','developer']，则需要过滤权限路由数据
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    ClickLeftInnerMenu ({ commit }, data) {
      commit('CLICK_INNER_LEFT_MENU', data)
    },
    ClickTopMenu ({ commit }, data) {
      commit('CLICK_TOP_MENU', data)
    }
  }
}

export default permission
