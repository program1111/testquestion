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
import examManage from '../pages/ExamManage/examManage'
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
