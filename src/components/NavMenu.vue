<template>
  <div class="menu_left cflex">
    <div class="menu_page_bottom is-scroll-left">
      <el-menu mode="vertical"    :default-active="$route.path" :collapse="isCollapse"
        :background-color="menuObj.bgColor" :text-color="menuObj.textColor" :active-text-color="menuObj.activeTextColor"
        :style="{width:sidebar.width+'px'}">
        <template v-for="(item,index) in permission_routers">
          <!--表示 有一级菜单-->
          <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
            <el-menu-item class="dropItem" :index="item.path+'/'+item.children[0].path">
              <template><i v-if="item.meta.icon" :class="item.meta.icon"></i>
                <span v-if="item.meta.title" slot="title">{{item.meta.title}} </span></template>
            </el-menu-item>
          </router-link>

          <!--表示 有二级或者多级菜单 -->
          <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"
            :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span v-if="item.meta.title" slot="title"> {{item.meta.title}}</span>
            </template>
            <!--直接定位到子路由上，子路由也可以实现导航功能-->
            <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)" :key="cindex">
              <el-menu-item v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                :index="getIindex(citem,item,cindex)">
                <span> {{citem.meta.title}} </span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'NavMenu',
  data () {
    return {
      menuObj: {
        bgColor: '#fff',
        textColor: '#666',
        activeTextColor: '#ff6428'
      },
      logo: logoImg
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'isCollapse',
      'sidebar',
      'menuIndex'
    ])
  },
  methods: {
    getIindex (citem, item, cindex) {
      return (citem.meta.titleList) ? item.path + '/' + citem.path + '/' + citem.meta.titleList[0].path : item.path + '/' + citem.path
    },
    signout () {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/' })
      })
    },
    clickMenuItem (item2) {
      console.log('-----点击了侧边栏')
      console.log(item2.order)

      // console.log(this.$store.getters.getUserName)
      // this.style.display = "none";
    },
    // 回到首页
    clickTitle () {
      // this.style.display = "block";
    },
    toggle () {
      this.collapse = !this.collapse
    }
  },
  created () {
    this.userName = localStorage.getItem('userid')
  },
  mounted () {
    // console.log(this.permission_routers, 'permission_routers')
    // console.log(this, 'is isCollapse')
  },
  beforeUpdated () {
    console.log(this, 'befor')
  }
}
</script>

<style lang="less" scoped>
  @left-bgColor: #fff;
  @icon-link: #FF6C60;

  .menu_left {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    text-align: left;

  }

  .menu_page_bottom {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    flex: 1;
    min-height: 500px;
    z-index: 10;
    box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);

  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

</style>
