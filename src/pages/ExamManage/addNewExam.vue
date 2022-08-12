<template>
  <div>
    <!-- <div style="border: 1px solid #cccccc; text-align: left;padding: 15px; margin-top: -20px;">
      <router-link active-class="active" to="/examManage/index"> <span class="el-icon-arrow-left"></span>返回
      </router-link>&nbsp;&nbsp;
      <strong style="color:#cccccc ;">|</strong>&nbsp;&nbsp;新增试卷
    </div> -->
    <div  >
      <el-page-header @back="goBack" content="新增试卷">
      </el-page-header>
    </div>
    <div style=" margin-top:20px;">
      <el-row :gutter="20">
        <el-col :span="14">
          <div style="width:580px;">
            <el-steps :active="active" simple>
              <el-step title="1.模式设置" icon="el-icon-edit"></el-step>
              <el-step title="2.选择题目" icon="el-icon-edit"></el-step>
              <el-step title="3.基本设置" icon="el-icon-edit"></el-step>
            </el-steps>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="width:150px;">
            <el-input placeholder="请输入题目名称"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="width:170px;">
            <el-input placeholder="请输入题目名称"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button class="el-icon-search"> </el-button>
        </el-col>

      </el-row>

    </div>
    <div style="min-height: 350px;margin-top: 10px;">
      <!--模块一-->
      <div v-if="active === 1">
        <el-form :model="form" class="form_class" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="考试类型" prop="examtype" style="width: 50%;">
            <el-radio-group v-model="form.examtype">
              <el-radio label="常规考试"></el-radio>
              <el-radio label="在线练习"></el-radio>
              <el-radio label="任务类考试"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="name" label="考试名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label=" 试卷类型" prop="testtype" style="width:39%;">
            <el-radio-group v-model="form.testtype">
              <el-radio label="测评试卷"></el-radio>
              <el-radio label="模拟试卷"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label=" 试卷分类" prop="region" style="width:100%;">
            <el-select v-model="form.region" placeholder="请选择分类" style="width:100%;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <div>没有合适的分类，点击 添加分类 立即添加</div>
          </el-form-item>
          <el-form-item label=" 选择题库" style="width:30%;">
            <el-button type="primary" @click="dialogFormVisible = true" class="el-icon-plus">添加题库</el-button>
          </el-form-item>

        </el-form>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form1">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!--模块一-->
      <!--模块二-->
      <div v-if="active === 2">
        <el-row>
          <el-col :span="18">
            <el-table ref="multipleTable" :data="choseSubject"  @select='onTableSelect'   tooltip-effect="dark" style="width: 100%; " :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column type="selection" width="55"  >
              </el-table-column>
              <el-table-column label="题目名称" width="400"  show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="tikuname" label="题库名称" width="120">
              </el-table-column>
              <el-table-column prop="type" label="题型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="score" label="分数"  show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="6"  >
            <el-table ref="multipleTable" :data="haschosedSubject" tooltip-effect="dark" style="width: 100%;"  border>

              <el-table-column label="已选择题目" width="200"  show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="tikuname" label="操作"   >
                <i class="el-icon-delete"></i>
              </el-table-column>

            </el-table>
          </el-col>
        </el-row>

      </div>

    <!--模块二-->
    <!--模块三-->
    <div v-if="active === 3">3</div>
    <!--模块三-->
  </div>

  <div class="Btn">
    <el-button @click="prev" v-if="active == 2 || active == 3  ">上一步</el-button>
    <el-button @click="next('form',{active})" v-if="active == 1 || active == 2 ">下一步</el-button>
    <el-button v-if="active == 3">提交</el-button>
  </div>
  </div>
</template>
<script>

export default {
  name: 'addNewExam',
  data () {
    return {
      active: 1,
      form: {
        search: '',
        examtype: '',
        testtype: '',
        name: '',
        fenglei: '',

        region: ''
      },
      choseSubject: [{
        id: 1,
        name: '历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      },
      {
        id: 2,
        name: '历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      },
      {
        id: 3,
        name: '历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      }],
      haschosedSubject: [{
        id: 1,
        name: '历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      }, {
        id: 2,
        name: '历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      }],
      dialogFormVisible: false,
      form1: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      rules: {
        // name: [
        //   { required: true, message: '请输入考试名称', trigger: 'blur' },
        //   { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择试卷分类', trigger: 'change' }
        // ],

        // examtype: [
        //   { required: true, message: '请选择考试类型', trigger: 'change' }
        // ],
        // testtype: [
        //   { required: true, message: '请选择试卷类型', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
    this.choseSubject.map((e, i) => {
      if (e.checked === true) {
        this.toggleSelection([this.choseSubject[i]])
        console.log('istrue')
      }
    })
  },
  methods: {
    prev () {
      --this.active
      if (this.active < 0) this.active = 0
    },
    next (form, a) {
      if (a === 1) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.active++ > 2) this.active = 0
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (this.active++ > 2) this.active = 0
    },
    onSubmit () {

    },
    goBack () {
      this.$router.push('/examManage/index')
    },
    selectInit (row, index) {
      console.log(row)
      // if (row.flowStatus === '已提交') {
      //   return false // 不可勾选
      // } else {
      //   return true // 可勾选
      // }
    },
    // handleSelectCodeForTicket (val) {
    //   console.log(val, ' ', this.haschosedSubject)
    //   // this.Selection = []
    //   val.forEach(v => {
    //     console.log(v.code, 'this is v')
    //     // this.Selection.push(v.code)
    //     this.haschosedSubject.push(v)
    //   })
    // },
    onTableSelect (rows, row) {
      console.log(rows, 'rows', row)
      const selected = rows.length && rows.indexOf(row) !== -1
      if (selected) {
        rows.forEach(v => {
        // console.log(v.code, 'this is v')
        // this.Selection.push(v.code)
          this.haschosedSubject.push(v)
        })
      } else {
        this.haschosedSubject.splice(row.id, 1)
      }
      console.log(selected, '是否选中') // true就是选中，0或者false是取消选中
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

</style>
