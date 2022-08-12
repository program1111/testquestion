<template>
  <div style="height: 600px;">
    <div style=" margin: 20px;">
      <el-form :model="form" class="form_class">
        <el-form-item>
          <el-col :span="5">
            <el-input v-model="form.search" placeholder="考试名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-form-item label="">
              <el-select v-model="form.questiontype" placeholder="请选择类型">
                <el-option label="单选题" value="0"></el-option>
                <el-option label="多选题" value="1"></el-option>
                <el-option label="判断题" value="2"></el-option>
                <el-option label="解答题" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button @click="addNewExam" icon="el-icon-check">新增</el-button>
            <el-button @click="onSubmit" icon="el-icon-delete">删除</el-button>
          </el-col>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <template slot="empty">
              <div style="height:70px;line-height:70px;">暂无数据</div>
            </template>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="考试名称" width="140" prop="name">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="course" label="课程" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="starttime" label="开始时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="endtime"  label="结束时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="count" label="题目数" width="70" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="totalpoints" width="70" label="总分" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="state" label="状态" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tag :type="scope.row.state === '已发布' ? 'primary' : 'success'" disable-transitions>
                  {{scope.row.state}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="process" label="操作" width="150" show-overflow-tooltip>
              <template  >
                <el-button type="text" size="small">
                  修改
                </el-button>
                <el-button type="text" size="small">
                  回收
                </el-button>
                <el-button type="text" size="small">
                  题目管理
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>
<script>

export default {
  name: 'examManage',
  data () {
    return {
      tableData: [{
        name: '全国计算机练习题',
        type: '在线练习',
        course: '计算机基础',
        starttime: '2022-04-21 05:45',
        endtime: '2022-05-12 12:23',
        count: '10',
        totalpoints: '100',
        state: '已发布',
        process: ''

      },
      {
        name: '全国计算机练习题',
        type: '在线练习',
        course: '计算机基础',
        starttime: '2022-04-21 05:45',
        endtime: '2022-05-12 12:23',
        count: '10',
        totalpoints: '100',
        state: '未发布',
        process: ''

      }],
      activeName: 'second',
      form: {
        name: '',
        questiontype: '',
        gradediffculty: '',
        chapter: '',
        delivery: false,
        type: [],
        resource: '',
        rightanswer: ''
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      input: ''

    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addNewExam () {
      this.$router.push('/examManage/addNewExam')
    }
  }
}
</script>
<style scoped>

</style>
