<template>

  <div>
    <div style=" margin: 20px;">
      <el-form :model="form" class="form_class">
        <el-form-item>
          <el-col :span="5">
            <el-input v-model="form.search" placeholder="请输入搜索内容"   ></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="searchByStem" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="onDelete" icon="el-icon-delete">删除</el-button>
          </el-col>
          <el-col :span="3">
            <el-upload  :file-list="fileList" class="upload-demo" action accept = ".xlsx,.xls" :auto-upload = "false" :show-file-list = "false" :on-change="handleExceed">
   <el-button @click="onSubmit" icon="el-icon-download">导入</el-button>
            </el-upload>

          </el-col>
          <el-col :span="2">
            <el-button @click="onSubmit" icon="el-icon-upload2">导出</el-button>
          </el-col>
        </el-form-item>

      </el-form>
    </div>
    <div style="margin:10px 20px;">
      <el-table :data="tableData" v-loading="loading"
      @selection-change="selectionLineChangeHandle">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="subject" label="科目" width="120">
        </el-table-column>
        <el-table-column prop="stem" label="题目名称">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="90">
          <template slot-scope="scope">
            <el-tag type="success" disable-transitions>
              {{scope.row.type}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="fullscore" label="分值" width="50">
        </el-table-column>
        <el-table-column prop="difficulty" width="150" label="难度">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.difficulty" disabled text-color="#ff9900"> </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="修改" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateDetail(scope.row)">
              修改
            </el-button>
            <el-button type="text" size="small" @click="deleteDetail(scope.row.id)" >
              删除
            </el-button>
            <el-button type="text" size="small" @click="showDetail(scope.row)">
              查看详情
            </el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination background :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev,pager,next"
        :total="tableDatalength" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="查看具体信息" :visible.sync="dialogTableVisible" style="text-align:left; ">
      <el-row>
        <el-col :span="20">
          <strong>{{showDetailData.id}}.</strong>{{showDetailData.stem}}<strong>({{showDetailData.fullscore}}分)</strong>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-row v-for="(i,index) in showDetailData.options" :key="index">
          <el-col :span="20" style="margin-top:10px;text-indent: 30px;">{{i.title}}</el-col>
        </el-row>
        <el-row>
          <strong>答案：</strong>
          <div v-for="(i,index) in showDetailData.rightanswer" :key="index" style="margin-top:10px;text-indent: 30px;">
            {{i.content}}</div>
        </el-row>
      </el-row>

    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogUpdateVisible">
      <el-form :model="showDetailData" class="form_class">
        <el-form-item>
          <el-col :span="2">
            <el-tag>题目</el-tag>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="showDetailData.stem">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-for="(i,index) in showDetailData.options" :key="index"
          v-show="showDetailData.type==='单选题'||showDetailData.type==='多选题'">
          <el-col :span="2">
            <el-tag type="success">{{index | transNumber}}</el-tag>
          </el-col>
          <el-col :span="20">
            <el-input style="width:100%" v-model="i.content"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="2">
            <el-tag>答案:</el-tag>
          </el-col>
          <el-col :span="20">
            <div>
              <div v-if=" showDetailData.type==='多选题'">
                <el-checkbox-group v-model="getrightanswer">
                  <el-checkbox v-for="(i,index) in showDetailData.options" :key="index" border :label="i.ordernumber">
                    {{index | transNumber}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="showDetailData.type==='单选题' ">

                <el-radio-group v-model="showDetailData.rightanswer[0].ordernumber">
                  <el-radio   v-for="(i,index) in showDetailData.options" :key="index" border :label="i.ordernumber"> {{index | transNumber}}</el-radio>

                </el-radio-group>
              </div>
              <div v-if="showDetailData.type==='判断题'">
                <!-- <div>{{showDetailData.rightanswer[0].title}}</div> -->
                <el-radio-group v-model="showDetailData.rightanswer[0].title">
                  <el-radio :label="'正确'">正确</el-radio>
                  <el-radio :label="'错误'">错误</el-radio>
                </el-radio-group>
              </div>
              <div v-if="showDetailData.type==='解答题'">

                <el-input type="textarea" :rows="4" placeholder="请输入内容"
                  v-model="showDetailData.rightanswer[0].content">
                </el-input>

              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="2">
            <el-tag>解析</el-tag>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="showDetailData.description">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>

          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirmUpdate">确认修改</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import * as XLSX from 'xlsx'
// import ExportJsonExcel from 'js-export-excel'
export default {
  name: 'allTest',
  data () {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5,
      tableData: [
        // {
        //   id: 1,
        //   stem: '谁是老大士大夫石帆胜丰的打发打发打发打发打发打发发达法沙发沙发',
        //   subject: '计算机',
        //   type: '选择题',
        //   fullscore: 4,
        //   difficulty: 2
        // }, {
        //   id: 2,
        //   stem: '谁是老大',
        //   subject: '计算机',
        //   type: '选择题',
        //   fullscore: 4,
        //   difficulty: 2
        // }, {
        //   id: 3,
        //   stem: '谁是老大',
        //   subject: '计算机',
        //   type: '选择题',
        //   fullscore: 4,
        //   difficulty: 2
        // }, {
        //   id: 1,
        //   stem: '谁是老大',
        //   subject: '计算机',
        //   type: '选择题',
        //   fullscore: 4,
        //   difficulty: 2
        // }
      ],
      getAllTestOptionsData: [
        // {
        //   difficulty: '2',
        //   chapter: '第一章',
        //   rightanswer: [
        //     {
        //       isrightanswer: 1,
        //       ordernumber: 66,
        //       id: 1,
        //       title: '"B.拉斯维加斯算法',
        //       questionid: 1,
        //       content: '拉斯维加斯算法'
        //     },
        //     {
        //       isrightanswer: 1,
        //       ordernumber: 68,
        //       id: 1,
        //       title: 'D.舍伍德算法',
        //       questionid: 2,
        //       content: '舍伍德算法'
        //     }
        //   ],
        //   subject: '算法',
        //   options: [
        //     {
        //       ordernumber: 65,
        //       id: 1,
        //       title: 'A.蒙特卡罗算法',
        //       questionid: 3,
        //       content: '蒙特卡罗算法'
        //     },
        //     {
        //       ordernumber: 66,
        //       id: 1,
        //       title: 'B.拉斯维加斯算法',
        //       questionid: 1,
        //       content: '拉斯维加斯算法'
        //     },
        //     {
        //       ordernumber: 67,
        //       id: 1,
        //       title: 'C数值随机化算法',
        //       questionid: 4,
        //       content: '数值随机化算法'
        //     },
        //     {
        //       ordernumber: 68,
        //       id: 1,
        //       title: 'D.舍伍德算法',
        //       questionid: 2,
        //       content: '舍伍德算法'
        //     }
        //   ],
        //   id: 1,
        //   fullscore: 5,
        //   type: '多选题',
        //   stem: '1以下随机化算法能得能保证得到的解是正确解的算法是（）'
        // },
        // {
        //   difficulty: '2',
        //   chapter: '第一章',
        //   rightanswer: [
        //     {
        //       isrightanswer: 1,
        //       ordernumber: 67,
        //       id: 2,
        //       title: 'C数值随机化算法',
        //       questionid: 5,
        //       content: 'C数值随机化算法'
        //     }
        //   ],
        //   subject: '算法',
        //   options: [
        //     {
        //       ordernumber: 67,
        //       id: 2,
        //       title: 'C数值随机化算法',
        //       questionid: 5,
        //       content: 'C数值随机化算法'
        //     }
        //   ],
        //   id: 2,
        //   fullscore: 5,
        //   type: '多选题',
        //   stem: '2以下随机化算法能得能保证得到的解是正确解的算法是（）'
        // },
        // {
        //   difficulty: '4',
        //   chapter: '第一章',
        //   rightanswer: [
        //     {
        //       isrightanswer: 1,
        //       ordernumber: 67,
        //       id: 3,
        //       title: 'C数值随机化算法',
        //       questionid: 6,
        //       content: 'C数值随机化算法'
        //     },
        //     {
        //       isrightanswer: 1,
        //       ordernumber: 68,
        //       id: 3,
        //       title: 'C数值随机化算法',
        //       questionid: 7,
        //       content: 'C数值随机化算法'
        //     }
        //   ],
        //   subject: '算法',
        //   options: [
        //     {
        //       ordernumber: 67,
        //       id: 3,
        //       title: 'C数值随机化算法',
        //       questionid: 6,
        //       content: 'C数值随机化算法'
        //     },
        //     {
        //       ordernumber: 68,
        //       id: 3,
        //       title: 'C数值随机化算法',
        //       questionid: 7,
        //       content: 'C数值随机化算法'
        //     }
        //   ],
        //   id: 3,
        //   fullscore: 5,
        //   type: '多选题',
        //   stem: '3以下随机化算法能得能保证得到的解是正确解的算法是（）'
        // }
      ],
      showDetailData: {},
      showDetailDataCopy: {},
      getrightanswer: [],
      form: {
        search: '',
        name: '',
        questiontype: '0',
        difficulty: '',
        chapter: '',
        subject: '',
        type: [],
        fullscore: '',
        resource: '',
        answer: '',
        stem: '',
        description: '',
        form1: { // 单选题
          stem: '11', // 题目
          A: '11',
          B: '',
          C: '',
          D: '',
          answer: '',
          description: '',
          chapter: '',
          subject: '',
          difficulty: ''
        },
        form2: { // 多选题
          stem: '',
          A: '',
          B: '',
          C: '',
          D: '',
          E: '',
          F: '',
          answer: '',
          description: '',
          chapter: '',
          subject: '',
          difficulty: ''

        },
        form3: { // 判断题
          stem: '',

          answer: '',
          description: '',
          chapter: '',
          subject: '',
          difficulty: ''
        },
        form4: { // 解答题
          stem: '',
          chapter: '',
          subject: '',
          answer: '',
          description: '',
          difficulty: ''

        }

      },

      tableDatalength: 0,
      loading: false,
      dialogTableVisible: false,
      dialogUpdateVisible: false,
      hasbeenSelectedLineListSelections: [],
      fileList: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.loading = true
      if (this.form.search !== '') {
        this.$api.getAllTest(this.currentPage, this.pageSize, this.form.search).then(res => {
          this.tableData = res.data.data.records
          this.tableDatalength = res.data.data.total
          this.loading = false
          console.log(this.tableData, 'this.tableData')
        })
      } else {
        this.$api.getAllTest(val, this.pageSize).then(response => {
          this.tableData = response.data.data.records
          this.tableDatalength = response.data.data.total
          this.loading = false
          console.log(response.data.records, '是否得到数据')
        })
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    onSubmit () {
      console.log('submit!')
    },
    handleEdit (a, b) {
      console.log(a, b)
      this.dialogTableVisible = true
    },
    handleDelete (a, b) {

    },
    showDetail (e) { // 查看详情
      this.dialogTableVisible = true
      this.showDetailData = this.getAllTestOptionsData.filter(v => {
        return v.id === e.id
      })[0]
      console.log(e, 'showDetail1111', this.showDetailData)
    },
    selectionLineChangeHandle (val) {
      this.hasbeenSelectedLineListSelections = val
    },
    updateDetail (e) {
      this.dialogUpdateVisible = true
      this.getrightanswer = JSON.parse(JSON.stringify(this.getrightanswer)).filter(v => {
        return false
      })
      this.showDetailData = JSON.parse(JSON.stringify(this.getAllTestOptionsData)).filter(v => {
        return v.id === e.id
      })[0]
      this.showDetailData.rightanswer.forEach(element => {
        this.getrightanswer.push(element.ordernumber)
      })
      console.log(this.showDetailData, '修改')
    },
    cancel () {
      this.dialogUpdateVisible = false
    },
    confirmUpdate () { // 确认修改
    //  console.log(this.showDetailData.rightanswer, 'this si ', this.showDetailData.rightanswer[0].ordernumber)
      if (this.showDetailData.type === '多选题') {
        this.showDetailData.rightanswer = JSON.parse(JSON.stringify(this.showDetailData.rightanswer)).filter(v => {
          return false
        })
        // console.log('我是多选题', this.showDetailData)
        this.showDetailData.options.forEach(v => {
          console.log(v, v.ordernumber, 'ordernumber')
          if (v.ordernumber === 65) {
            if (this.getrightanswer.indexOf(65) !== -1) {
              this.showDetailData.options[0].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[0])
            } else {
              this.showDetailData.options[0].isrightanswer = 0
            }
            v.title = 'A' + v.content
          } if (v.ordernumber === 66) {
            if (this.getrightanswer.indexOf(66) !== -1) {
              this.showDetailData.options[1].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[1])
            } else {
              this.showDetailData.options[1].isrightanswer = 0
            }
            v.title = 'B' + v.content
          } if (v.ordernumber === 67) {
            if (this.getrightanswer.indexOf(67) !== -1) {
              this.showDetailData.options[2].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[2])
            } else {
              this.showDetailData.options[2].isrightanswer = 0
            }
            v.title = 'C' + v.content
          } if (v.ordernumber === 68) {
            if (this.getrightanswer.indexOf(68) !== -1) {
              this.showDetailData.options[3].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[3])
            } else {
              this.showDetailData.options[3].isrightanswer = 0
            }
            v.title = 'D' + v.content
          } if (v.ordernumber === 69) {
            if (this.getrightanswer.indexOf(69) !== -1) {
              this.showDetailData.options[4].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[4])
            } else {
              this.showDetailData.options[4].isrightanswer = 0
            }
            v.title = 'E' + v.content
          } if (v.ordernumber === 70) {
            if (this.getrightanswer.indexOf(70) !== -1) {
              this.showDetailData.options[5].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[5])
            } else {
              this.showDetailData.options[5].isrightanswer = 0
            }
            v.title = 'F' + v.content
          }
          // this.getrightanswer.daan.push(this.showDetailData.options)
        })
        this.$api.updateTimu(this.showDetailData).then(response => {
          console.log(response + 'ddd', this.showDetailData)
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else {
            this.$message.success(response.data.data.message)
            this.dialogUpdateVisible = false
            // this.handleCurrentChange(this.currentPage)
            this.returnAllTestOptions()
          }
        })
      } else if (this.showDetailData.type === '判断题') {
        this.showDetailData.options[0].content = this.showDetailData.rightanswer[0].title === '正确' ? '正确' : '错误'
        this.showDetailData.options[0].title = this.showDetailData.rightanswer[0].title === '正确' ? '正确' : '错误'
        this.showDetailData.rightanswer[0].title = this.showDetailData.rightanswer[0].title === '正确' ? '正确' : '错误'
        this.showDetailData.rightanswer[0].content = this.showDetailData.rightanswer[0].title === '正确' ? '正确' : '错误'
        this.showDetailData.options[0].isrightanswer = 1
      } else if (this.showDetailData.type === '单选题') {
        this.showDetailData.options.forEach(v => {
          if (v.ordernumber === 65) {
            if (this.showDetailData.rightanswer[0].ordernumber === 65) {
              this.showDetailData.options[0].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[0])
            } else {
              this.showDetailData.options[0].isrightanswer = 0
            }
            v.title = 'A.' + v.content
          } if (v.ordernumber === 66) {
            if (this.showDetailData.rightanswer[0].ordernumber === 66) {
              this.showDetailData.options[1].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[1])
            } else {
              this.showDetailData.options[1].isrightanswer = 0
            } v.title = 'B.' + v.content
          }
          if (v.ordernumber === 67) {
            if (this.showDetailData.rightanswer[0].ordernumber === 67) {
              this.showDetailData.options[2].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[2])
            } else {
              this.showDetailData.options[2].isrightanswer = 0
            } v.title = 'C.' + v.content
          }
          if (v.ordernumber === 68) {
            if (this.showDetailData.rightanswer[0].ordernumber === 68) {
              this.showDetailData.options[3].isrightanswer = 1
              this.showDetailData.rightanswer.push(this.showDetailData.options[3])
            } else {
              this.showDetailData.options[3].isrightanswer = 0
            }
          } v.title = 'D.' + v.content
        })
      } else if (this.showDetailData.type === '解答题') {
        this.showDetailData.options[0].isrightanswer = 1
        this.showDetailData.options[0].content = this.showDetailData.rightanswer[0].content
        this.showDetailData.options[0].title = this.showDetailData.rightanswer[0].content
        console.log(this.showDetailData, '解答题')
      }
      console.log(this.showDetailData, 'this.showdataildata数据')
      this.$api.updateTimu(this.showDetailData).then(response => {
        console.log(response + 'ddd', this.showDetailData)
        if (response.status === 500) {
          this.$message.error('服务器连接失败，请刷新在试试')
        } else {
          this.$message.success(response.data.data.message)
          this.dialogUpdateVisible = false
          // this.handleCurrentChange(this.currentPage)
          this.returnAllTestOptions()
        }
      })
    },
    isChecked (e) {
      var ee = this.$options.filters.transNumber(e)
      console.log(this.getrightanswer.indexOf(e), e, this.getrightanswer)
      // if (this.getrightanswer.indexOf(e) === -1) {
      //  this.getrightanswer.push(e)
      // } else {
      // this.getrightanswer.splice(this.getrightanswer.indexOf(e), 1)
      // }
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeee', ee, e, this.getrightanswer)
      // alert(ee, this.getrightanswer.toString())
    },
    returnAllTestOptions () {
      this.$api.getAllTestOptions().then(response => {
        if (response.status === 500) {
          this.$message.error('服务器连接失败，请刷新在试试')
        } else {
          this.getAllTestOptionsData = response.data.data.alltest
          this.$api.getAllTest(this.currentPage, this.pageSize).then(res => {
            this.tableData = res.data.data.records
            this.tableDatalength = res.data.data.total
            this.loading = false
          })
        }
      })
    },
    onDelete () {
      console.log(this.hasbeenSelectedLineListSelections, '  this.hasbeenSelectedLineListSelections')
      if (this.hasbeenSelectedLineListSelections.length === 0) {
        this.$message({
          type: 'error',
          message: '未选中要删除的内容'
        })
      } else {
        this.$confirm('确认要删除选中的内容吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hasbeenSelectedLineListSelections.forEach(v => {
            this.$api.deleteDetail(v.id).then(response => {
              if (response.status === 500) {
                this.$message.error('服务器连接失败，请刷新在试试')
              } else if (response.data.flag === true) {
                this.$message.success(response.data.data.message)
                this.returnAllTestOptions()
              } else {
                this.$message.error(response.data.data.message)
              }
              console.log(response.data.data.flag, response, 'e i s')
            })
            const index = this.tableData.findIndex((id1) => {
              return id1.id === v.id
            })
            // 当查找失败返回
            if (index === -1) {
              return console.log('删除失败')
            }
          // 如果找到该元素，使用splice方法删除元素
          // this.tableData.splice(index, 1)
          })
          this.returnAllTestOptions()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },

    deleteDetail (e) {
      this.$confirm('确认要删除选中的内容吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteDetail(e).then(response => {
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else if (response.data.flag === true) {
            this.$message.success(response.data.data.message)
            this.returnAllTestOptions()
          } else {
            this.$message.error(response.data.data.message)
          }
          console.log(response.data.data.flag, response, 'e i s')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    searchByStem () {
      this.$api.getAllTestOptions().then(response => {
        console.log('response is2222', this.form.search)
        if (response.status === 500) {
          this.$message.error('服务器连接失败，请刷新在试试')
        } else {
          this.getAllTestOptionsData = response.data.data.alltest
          this.$api.getAllTest(this.currentPage, this.pageSize, this.form.search).then(res => {
            this.tableData = res.data.data.records
            this.tableDatalength = res.data.data.total
            this.loading = false
            console.log(this.tableData, 'this.tableData')
          })
          console.log('this.tableData1')
        }
      })
    },
    async handleExceed  (e) {
      const file = e.raw

      if (!file) { return }
      // 读取文件 file，并在读取完后将值赋值给 data
      let data = await this.readFile(file)
      // 利用XLSX的方法，将数据转换成可读数据
      const workbook = XLSX.read(data, { type: 'binary' })
      // 获取excel表格第一个Sheet页签的数据
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      // 将数据转换成接送对象
      data = XLSX.utils.sheet_to_json(worksheet)
      console.log(data)// 打印出来的数据如下图

      // 将数据利用post传递至后台，插入进库
      this.$api.importTimu(data).then(res => {
        if (res.status === 500) {
          this.$message.error('服务器连接失败，请刷新在试试')
        } else {
          this.$message.success(res.data.data)
          console.log('这是res', res)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    readFile (file) {
      return new Promise(resolve => {
        // 创建声明一个 FileReader
        const reader = new FileReader()
        // 将文件 file 以二进制的方式读取出来
        reader.readAsBinaryString(file)
        // 文件读取完成后将结果返回
        reader.onload = (ev) => {
          resolve(ev.target.result)
        }
      })
    }
  },

  mounted () {
    console.log('数据是否发生变化')
    this.returnAllTestOptions()
  },
  filters: {
    transNumber (i) {
      const dist = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F'
      }
      return dist[i] || ''
    }

  },
  watch: {
    $route (to, from) {
      if (to.path === '/testmanage/alltest') {
        this.returnAllTestOptions()
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
