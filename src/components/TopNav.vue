<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class='bread_container' @click="handleLefeMenu">
          <span class="bars">
            <i class="el-icon-s-unfold" v-if="changeBarDirection"></i>
            <i class="el-icon-s-fold" v-if="!changeBarDirection"></i>
          </span>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top: 10px;"></el-avatar>
      </el-col>
    </el-row>

  </div>

</template>
<script>

export default {
  data () {
    return {
      changeBarDirection: false
    }
  },
  created () {
  },
  computed: {
    matchedArr () {
      const temp = []; const temps = []
      this.$route.matched.filter((item, index, self) => {
        // if(item.meta.title){
        // const title = item.meta.title;
        //     temp.push(title);
        // }
        if (item.name) {
          const name = item.name
          temp.push(name)
        }
      })
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item)
        }
      })
      return temps
    }
  },
  mounted () {
  },
  methods: {
    handleLefeMenu () {
      this.$store.dispatch('setLeftCollapse') // 折叠菜单
      this.$store.dispatch('handleLeftMenu') // 改变菜单宽度 180->35/35-180
      this.changeBarDirection = !this.changeBarDirection
    }
  },
  watch: {

  }
}

</script>

<style lang="less" scoped>
  .bread_container {
    background-color: #ffffff;
    width: 50px;

  }

  .bread_container:hover {
    background-color: #e5e5e5;
    cursor: pointer;
  }

</style>
