<template>
    <el-container>
        <el-aside ref="menu_right" width="180px">
            <NavMenu></NavMenu>
        </el-aside>
        <el-container>
            <el-header>
                <TopNav></TopNav>
            </el-header>
            <el-main>
                <router-view></router-view>
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
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  components: {
    NavMenu,
    TopNav
  },
  created () {
  },
  mounted () {
  },
  watch: {

  }
}
</script>
<style scoped>
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

</style>
