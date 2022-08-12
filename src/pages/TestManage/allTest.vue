<template>

  <div>
    <div style=" margin: 20px;">
      <el-form :model="form" class="form_class">
        <el-form-item>
          <el-col :span="5">
            <el-input v-model="form.search" placeholder="请输入搜索内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button   @click="onSubmit" icon="el-icon-delete">删除</el-button>
          </el-col>
          <el-col :span="3">
            <el-button   @click="onSubmit" icon="el-icon-download">导入</el-button>
          </el-col>
          <el-col :span="2">
            <el-button   @click="onSubmit" icon="el-icon-upload2">导出</el-button>
          </el-col>
        </el-form-item>

      </el-form>
    </div>
    <div style="margin:10px 20px;">
      <el-table :data="tableData">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="number" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="subject" label="科目" width="120">
        </el-table-column>
        <el-table-column prop="name" label="题目名称" width="350">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="90">
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>
              {{scope.row.type}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="scorevalue" label="分值" width="80">
        </el-table-column>
        <el-table-column prop="value" width="150" label="难度">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.value" disabled text-color="#ff9900"> </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="修改" width="105">
          <template >
            <el-button type="text" size="small">
              修改
            </el-button>
            <el-button type="text" size="small">
              删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next" :total="100" :page-size="5">
      </el-pagination>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="tableData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'allTest',
  data () {
    return {
      tableData: [{
        number: '1',
        name: '谁是老大士大夫石帆胜丰的打发打发打发打发打发打发发达法沙发沙发',
        subject: '计算机',
        type: '选择题',
        scorevalue: 4,
        value: 2
      }, {
        number: '1',
        name: '谁是老大',
        subject: '计算机',
        type: '选择题',
        scorevalue: 4,
        value: 2
      }, {
        number: '1',
        name: '谁是老大',
        subject: '计算机',
        type: '选择题',
        scorevalue: 4,
        value: 2
      }],

      form: {
        search: ''
      },
      dialogTableVisible: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleEdit (a, b) {
      console.log(a, b)
      this.dialogTableVisible = true
    },
    handleDelete (a, b) {

    }
  }
}
</script>
<style lang="less" scoped>

</style>
