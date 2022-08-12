import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import home from '../components/home'
import otherManage from '../pages/OtherManage/otherManage'
import scoreManage from '../pages/ScoreManage/scoreManage'
import addStudent from '../pages/StudentManage/addStudent'
import studentManage from '../pages/StudentManage/studentManage'
import teacherManage from '../pages/TeacherManage/teacherManage'
import allTest from '../pages/TestManage/allTest'
import addTest from '../pages/TestManage/addTest'
import indexManage from '../pages/IndexManage'
import examManage from '../pages/ExamManage/examManage'
import addNewExam from '../pages/ExamManage/addNewExam'
import { getToken } from '../utils/auth'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: login

},
{
  path: '/login',
  component: login

},
{
  path: '/index',
  name: 'index',
  component: home,
  meta: {
    title: '首页',
    icon: 'el-icon-reading'
  },
  noDropdown: true,
  children: [
    {
      path: 'index',
      meta: {
        title: '首页',
        icon: 'el-icon-home',
        routerType: 'leftmenu'
      },
      component: indexManage
    }
  ]

},

// {
//   path: '/',
//   name: 'index',
//   component: home,
//   meta: {
//     title: '首页',
//     icon: 'el-icon-reading'
//   },
//   noDropdown: true,
//   children: [
//     {
//       path: 'addNewExam',
//       meta: {
//         title: '首页',
//         icon: 'el-icon-home',
//         routerType: 'leftmenu'
//       },
//       component: addNewExam
//     }
//   ]

// },
{
  path: '/examManage',
  name: 'index',
  component: home,
  meta: {
    title: '考试管理',
    icon: 'el-icon-reading'
  },
  noDropdown: true,
  children: [
    {
      path: 'index',
      meta: {
        title: '考试管理',
        icon: 'el-icon-reading',
        routerType: 'leftmenu'
      },
      component: examManage
    }, {
      path: 'addNewExam',
      meta: {
        title: '首页',
        icon: 'el-icon-home',
        routerType: 'leftmenu'
      },
      component: addNewExam
    }
  ]

},
{
  path: '/testmanage',
  name: 'fundManage',
  meta: {
    title: '题库管理',
    icon: 'el-icon-coin'
  },
  component: home,
  children: [
    {
      path: 'alltest',
      name: 'alltest',
      meta: {
        title: '所有题库',
        routerType: 'leftmenu'
      },
      component: allTest
    },
    {
      path: 'addtest',
      name: 'addtest',
      meta: {
        title: '添加题库',
        routerType: 'leftmenu'
      },
      component: addTest
    }
  ]
},
{
  path: '/scoremanage',
  name: 'scoremanage',
  component: home,
  meta: {
    title: '成绩管理',
    icon: 'el-icon-edit'
  },
  noDropdown: true,
  children: [
    {
      path: 'scoremanage',
      meta: {
        title: '成绩管理',
        icon: 'icondashboard',
        routerType: 'leftmenu'
      },
      component: scoreManage
    }
  ]

},
{
  path: '/studentmanage',
  name: 'fundManage',
  meta: {
    title: '学生管理',
    icon: 'el-icon-s-custom'
  },
  component: home,
  children: [
    {
      path: 'studentmanage',
      name: 'studentmanage',
      meta: {
        title: '学生管理',
        routerType: 'leftmenu'
      },
      component: studentManage
    },
    {
      path: 'addstudent',
      name: 'addstudent',
      meta: {
        title: '添加学生',
        routerType: 'leftmenu'
      },
      component: addStudent
    }
  ]
},

{
  path: '/teachermanage',
  name: 'userManage',
  component: home,
  meta: {
    title: '用户管理',
    icon: 'el-icon-user'
  },
  noDropdown: true,
  children: [
    {
      path: 'teachermanage',
      meta: {
        title: '用户管理',
        icon: 'el-icon-user',
        routerType: 'leftmenu'
      },
      component: teacherManage
    }
  ]
},

{
  path: '/permission',
  name: 'permission',
  meta: {
    title: '权限设置',
    icon: 'el-icon-setting',
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
    icon: 'el-icon-question'
  },
  children: [
    {
      path: '401',
      name: 'page401',
      component: otherManage,
      meta: {
        title: '401',
        noCache: true
      }
    },
    {
      path: '404',
      name: 'page404',
      component: otherManage,
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
  base: '/main', // 添加跟目录,对应服务器部署子目录
  routes: routes
})
// 前置

router.beforeEach((to, from, next) => {
  const token = getToken('Token')
  console.log(token, 'token')
  if (token && (to.path === '/' || to.path === '/login')) {
    next()
    next('/index/index')
  } else if (token && to.path !== '/login') {
    // 有token 但不是去 login页面 通过
    next()
  } else if (token && to.path === '/login') {
    // 有token 但是去 login页面 不通过 重定向到首页
    next('/')
  } else if (!token && to.path !== '/login') {
    // 没有token 但不是去 login页面 不通过（未登录不给进入）
    next('/login')
  } else {
    // 剩下最后一种 没有token 但是去 login页面 通过
    next()
  }
})
export default router
