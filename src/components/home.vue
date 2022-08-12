<template>
  <el-container>

    <el-aside :style="{width:sidebar.width+'px'}">
      <NavMenu></NavMenu>
    </el-aside>

    <el-container>

      <el-header style="padding:0%">
        <TopNav></TopNav>

      </el-header>
      <el-main>
        <page-tabs :keep-alive-component-instance="keepAliveComponentInstance" v-show="$route.path!=='/index/index'&&$route.path!=='/examManage/addNewExam'" />
        <div ref="keepAliveContainer">
          <keep-alive>
           <router-view :key="$route.fullPath" />
          </keep-alive>
         </div>
        <!--页面渲染入口-->
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>

</template>
<script>
import { mapGetters } from 'vuex'
import NavMenu from './NavMenu'
import TopNav from './TopNav'
import pageTabs from './pageTabs.vue'
export default {
  name: 'home',
  data () {
    return {
      keepAliveComponentInstance: null
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  components: {
    NavMenu,
    TopNav,
    pageTabs

  },
  created () {
  },
  mounted () {
    if (this.$refs.keepAliveContainer) {
      this.keepAliveComponentInstance = this.$refs.keepAliveContainer.childNodes[0].__vue__
    }
    console.log(this.$refs, 'ref', this.$route.fullPath)
  },
  watch: {

  },
  beforeUpdated () {
    console.log(this, 'befor')
  },
  methods: {
    go (path) {
      if (path !== this.$route.fullPath) {
        this.$router.push(path)
        console.log(this.$route.fullPath, 'fullpath')
      }
    }
  }
}
</script>
<style scoped>
  .el-header,
  .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    /* line-height: 160px; */

  }

</style>
