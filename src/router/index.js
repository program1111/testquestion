import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
// import Home from '../views/Home.vue'
// import examManage from '../pages/ExamManage/examManage'
// import navMenu from '../components/NavMenu'
import home from '../components/home'
// import otherManage from '../pages/OtherManage/otherManage'
// import scoreManage from '../pages/ScoreManage/scoreManage'
// import addStudent from '../pages/StudentManage/addStudent'
// import studentManage from '../pages/StudentManage/studentManage'
// import teacherManage from '../pages/TeacherManage/teacherManage'
import allTest from '../pages/TestManage/allTest'
import addTest from '../pages/TestManage/addTest'
// import ExamManage from '../pages/ExamManage/ExamManage'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: login

},

{
  path: '/index',
  name: 'index',
  component: home,
  meta: {
    title: '首页',
    icon: 'icondashboard'
  },
  noDropdown: true,
  children: [
    {
      path: 'index',
      meta: {
        title: '首页1',
        icon: 'icondashboard',
        routerType: 'leftmenu'
      },
      component: allTest
    }
  ]

},
{
  path: '/index',
  name: 'index',
  component: home,
  meta: {
    title: '首页2',
    icon: 'icondashboard'
  },
  noDropdown: true,
  children: [
    {
      path: 'index1',
      meta: {
        title: '首页',
        icon: 'icondashboard',
        routerType: 'leftmenu'
      },
      component: addTest
    }
  ]

},
{
  path: '/userManager',
  name: 'userManage',
  component: home,
  meta: {
    title: '用户管理',
    icon: 'iconuser'
  },
  noDropdown: true,
  children: [
    {
      path: 'userList',
      meta: {
        title: '用户管理',
        icon: 'iconuser',
        routerType: 'leftmenu'
      },
      component: addTest
    }
  ]
},
{
  path: '/share',
  name: 'share',
  component: home,
  meta: {
    title: '分享功能',
    icon: 'iconshare'
  },
  noDropdown: true,
  children: [
    {
      path: 'share',
      meta: {
        title: '分享功能',
        icon: 'iconshare',
        routerType: 'leftmenu'
      },
      component: addTest
    }
  ]
},

{
  path: '/fundManage',
  name: 'fundManage',
  meta: {
    title: '资金管理',
    icon: 'iconpay3'
  },
  component: home,
  children: [
    {
      path: 'fundList',
      name: 'fundList',
      meta: {
        title: '资金流水',
        routerType: 'leftmenu'
      },
      component: addTest
    },
    {
      path: 'chinaTabsList',
      name: 'chinaTabsList',
      meta: {
        title: '区域投资',
        routerType: 'leftmenu'
      },
      component: addTest
    }, {
      path: 'fundList',
      name: 'fundList',
      meta: {
        title: '资金流水',
        routerType: 'leftmenu'
      },
      component: addTest
    }
  ]
},
{
  path: '/fundData',
  name: 'fundData',
  meta: {
    title: '资金数据',
    icon: 'iconecharts'
  },
  component: home,
  redirect: '/fundData/fundPosition',
  children: [
    {
      path: 'fundPosition',
      name: 'fundPosition',
      meta: {
        title: '投资分布'
      },
      component: addTest
    },
    {
      path: 'typePosition',
      name: 'typePosition',
      meta: {
        title: '项目分布'
      },
      component: addTest
    },
    {
      path: 'incomePayPosition',
      name: 'incomePayPosition',
      meta: {
        title: '收支统计'
      },
      component: addTest
    }
  ]
},
{
  path: '/permission',
  name: 'permission',
  meta: {
    title: '权限设置',
    icon: 'iconpermission',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  component: home,
  redirect: '/permission/page',
  children: [{
    path: 'page',
    name: 'pagePer',
    meta: {
      title: '页面权限',
      roles: ['admin'] // or you can only set roles in sub nav
    },
    component: addTest
  }, {
    path: 'directive',
    name: 'directivePer',
    meta: {
      title: '按钮权限',
      roles: ['editor']
    },
    component: addTest
  }]
},
{
  path: '/error',
  component: home,
  name: 'errorPage',
  meta: {
    title: '错误页面',
    icon: 'iconError'
  },
  children: [
    {
      path: '401',
      name: 'page401',
      component: addTest,
      meta: {
        title: '401',
        noCache: true
      }
    },
    {
      path: '404',
      name: 'page404',
      component: addTest,
      meta: {
        title: '404',
        noCache: true
      }
    }
  ]
}]
export const constantRouterMap = routes
export const asyncRouterMap = [

]
const router = new VueRouter({
  mode: 'history', // 默认为'hash'模式
  base: '/', // 添加跟目录,对应服务器部署子目录
  routes: routes
})
// 前置
router.beforeEach((to, from, next) => {
  console.log(router, 'this is router')
  // 如果要去My或者index页面
  if (to.path === '/My' || to.path === '/main') {
    console.log('这是路由首位')
    // 判断l如果ocalStorage里面是否有Username
    if (localStorage.getItem('username')) {
      // 有用户信息让它继续走
      next(true)
    } else {
      // 否则让它跳转到登录界面，跳转到登录界面时，需要把to.path传入，方便在登录成功时跳转到对应界面上
      next({
        path: '/Login',
        query: {
          topath: to.path
        }
      })
    }
  } else {
    // 否则去其他界面时 让它继续走
    next(true)
  }
})
export default router
