<template>
  <div class='bread_container' id="bread_container">
    <span @click="handleLefeMenu" class="bars">
    <i class="el-icon-s-unfold"    v-if="changeBarDirection"></i>
    <i class="el-icon-s-fold"     v-if="!changeBarDirection"></i>
    </span>
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

<style   scoped>

.bread_container{
background-color: #eaebec;
width:45px;
}
</style>
