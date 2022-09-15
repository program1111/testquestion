<template>
  <div>
    <!-- <div style="border: 1px solid #cccccc; text-align: left;padding: 15px; margin-top: -20px;">
      <router-link active-class="active" to="/examManage/index"> <span class="el-icon-arrow-left"></span>返回
      </router-link>&nbsp;&nbsp;
      <strong style="color:#cccccc ;">|</strong>&nbsp;&nbsp;新增试卷
    </div> -->
    <div>
      <el-page-header @back="goBack" content="新增试卷">
      </el-page-header>
    </div>
    <div style=" margin-top:20px;">
      <el-row :gutter="20">
        <el-col :span="18">
          <div style="width:580px;">
            <el-steps :active="active" simple>
              <el-step title="1.模式设置" icon="el-icon-edit"></el-step>
              <el-step title="2.选择题目" icon="el-icon-edit"></el-step>
              <el-step title="3.基本设置" icon="el-icon-edit"></el-step>
            </el-steps>
          </div>
        </el-col>
        <!-- <el-col :span="4"  >
          <div style="width:150px;">
          11  <el-input placeholder="请输入题目名称" @keyup.enter.native="searchByName" v-model="searcOriginalhName"></el-input>
          </div>
        </el-col> -->
        <el-col :span="4" v-if="active==2">
          <div style="width:170px;">
            <el-input placeholder="请输入题目名称" v-model="searchFinalName" @keyup.enter.native="searchByChosedName"></el-input>
          </div>
        </el-col>
        <el-col :span="2" v-if="active==2">
          <el-button class="el-icon-search" @click="searchByChosedName1(searchFinalName)"> </el-button>
        </el-col>

      </el-row>

    </div>
    <div style="min-height: 370px;margin-top: 10px;">
      <!--模块一-->
      <div v-show="active === 1">
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
      <div v-show="active === 2">
        <el-row>
          <el-col :span="18">
            <el-table ref="multipleTable" :data="choseCopySubject" @select='onTableSelect'
              @selection-change="handleSelectionChange" tooltip-effect="dark" style="width: 100%; "
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="题目名称" width="400" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="tikuname" label="题库名称" width="120">
              </el-table-column>
              <el-table-column prop="type" label="题型" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="score" label="分数" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div style="margin-top: 10px;">
              <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" :total="choseSubject.length">
              </el-pagination>
            </div>

          </el-col>
          <el-col :span="6">
            <el-table ref="multipleTable1" :data="hasSelected" tooltip-effect="dark" style="width: 100%;" border>

              <el-table-column label="已选择题目"   show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="tikuname" label="操作" width="60">
                <template slot-scope="scope"> <i class="el-icon-delete" v-on:click="del(scope.row)"></i></template>

              </el-table-column>

            </el-table>
          </el-col>
        </el-row>
      </div>

      <!--模块二-->
      <!--模块三-->
      <div v-show="active === 3">

        <el-form :model="basicForm" :rules="rules" ref="basicForm" label-width="100px" class="demo-ruleForm"
          style="width:80%">
          <el-form-item label="考试范围" prop="contentCovered">
            <el-radio-group v-model="basicForm.contentCovered">
              <el-radio label="所有人"></el-radio>
              <el-radio label="指定对象"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label=" 考试时间">
            <el-date-picker v-model="basicForm.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>

          </el-form-item>

          <el-form-item label="考试时长" prop="testTime">

            <el-input v-model="basicForm.testTime"></el-input>
          </el-form-item>
          <el-form-item label="及格分数" prop="passMark">
            <el-input v-model="basicForm.passMark"></el-input>
            <div>当前试卷总分数：55</div>
          </el-form-item>
          <el-form-item label="考试说明" prop="testExplanation">
            <el-input type="textarea" v-model="basicForm.testExplanation"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <!--模块三-->
    </div>

    <div class="Btn" style="margin-top: 10px;">
      <el-button @click="prev" v-if="active == 2 || active == 3  ">上一步</el-button>
      <el-button @click="next('form',{active})" v-if="active == 1 || active == 2 ">下一步</el-button>
      <el-button v-if="active == 3" type="primary" @click="submitForm('basicForm')">提交</el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'addNewExam',
  data () {
    return {
      searcOriginalhName: 'SSS',
      searchFinalName: 'AAA',
      currentPage: 1, // 当前页码
      pageSize: 3,
      active: 2,
      recordPresentHasChosedLength: 0,
      hasSelected: [],
      form: {
        search: '',
        examtype: '',
        testtype: '',
        name: '33',
        fenglei: '',
        testTime: '',
        passMark: '',
        testExplanation: '',
        region: '',
        date1: ''

      },
      choseCopySubject: [],
      choseSubject: [{
        id: 1,
        name: '1',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      },
      {
        id: 2,
        name: '2',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'
      },
      {
        id: 3,
        name: '3',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      },
      {
        id: 4,
        name: '4历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      },
      {
        id: 5,
        name: '5历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      },
      {
        id: 6,
        name: '6历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      },
      {
        id: 7,
        name: '7历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      }, {
        id: 8,
        name: '3历年中考作文题目汇总2013到2010年中考作文题目汇总2013全国各地中考作文题目篇二：2015中考作文题目汇总2015中考作文题目汇',
        tikuname: 'ss',
        type: 'ss',
        score: 'ss'

      }
      ],
      haschosedSubject: [],
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
      basicForm: {
        contentCovered: '',
        testTime: '',
        passMark: '',
        testExplanation: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入考试名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择试卷分类', trigger: 'change' }
        ],

        examtype: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ],
        testtype: [
          { required: true, message: '请选择试卷类型', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        contentCovered: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        date1: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        testTime: [
          { required: true, message: '请输入考试时长（分钟）', trigger: 'blur' }
        ],
        passMark: [
          { required: false, message: '请输入及格分数', trigger: 'blur' }
        ]

      }

    }
  },
  mounted () {
    this.choseCopySubject = this.choseSubject
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    prev () {
      --this.active
      if (this.active < 0) this.active = 0
    },
    next (form, a) {
      if (a.active === 1) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.active++ > 2) this.active = 0
          } else {
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
    },
    handleSelectionChange (val, a) {
      if (val.length === this.choseCopySubject.length && this.choseCopySubject.length !== this.handleSelectionChange.length) {
        this.haschosedSubject = []
        val.forEach(v => {
          this.haschosedSubject.push(v)
        })
        this.hasSelected = this.haschosedSubject
      } else if (val.length === 0 && this.choseCopySubject.length === this.haschosedSubject.length) {
        this.haschosedSubject = []
        this.hasSelected = this.haschosedSubject
      }
    },
    onTableSelect (rows, row) {
      const selected = rows.length && rows.indexOf(row) !== -1

      if (selected) {
        this.haschosedSubject = []

        rows.forEach(v => {
          this.haschosedSubject.push(v)
        })
        this.hasSelected = this.haschosedSubject
      } else {
        this.haschosedSubject = this.haschosedSubject.filter((v) => {
          return row.id !== v.id
        })
        this.hasSelected = this.haschosedSubject
      }
    },
    del (e) {
      this.haschosedSubject = this.haschosedSubject.filter((v) => {
        return e.id !== v.id
      })
      this.hasSelected = this.haschosedSubject
      this.$refs.multipleTable.toggleRowSelection(e)
    },
    submitForm (e) {
      console.log(this.form, 'this.form', this.basicForm, 'this.basicForm', this.haschosedSubject)
    },
    searchByChosedName (event) {
      this.hasSelected = this.haschosedSubject.filter(v => {
        return v.name.indexOf(event.target.value) !== -1
      })
    },
    searchByChosedName1 (event) {
      this.hasSelected = this.haschosedSubject.filter(v => {
        return v.name.indexOf(event) !== -1
      })
    }

    // searchByName (event) {
    //   console.log('----------1-------------')
    //   this.chage1(event).then(val => {
    //     this.chage2()
    //   })
    //   console.log('----------4-------------')
    //   console.log(event.target.value, 'this.choseCopySubject2222 ', this.choseCopySubject)
    // },
    // chage1 (event) {
    //   this.recordPresentHasChosedLength = this.haschosedSubject.length
    //   console.log('----------2-------------')
    //   return new Promise((resolve, reject) => {
    //     this.choseCopySubject = this.choseSubject.filter(v => {
    //       return v.name.indexOf(event.target.value) !== -1
    //     })
    //     resolve('ok')
    //   })
    // },
    // chage2 () {
    //   console.log('----------3-------------')
    //   return new Promise((resolve, reject) => {
    //     console.log(this.haschosedSubject, 'this.haschosedSubjectasdsad', this.recordPresentHasChosedLength, this.haschosedSubject.length, this.choseSubject.length)
    //     if (this.recordPresentHasChosedLength === this.choseSubject.length) {
    //       this.haschosedSubject = this.choseSubject
    //       console.log('the same ')
    //     }
    //     this.haschosedSubject.forEach(v => {
    //       console.log(this.haschosedSubject, '000000000000000')
    //       this.$refs.multipleTable.toggleRowSelection(v)
    //     })

    //     resolve('ok')
    //   })
    // }
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
