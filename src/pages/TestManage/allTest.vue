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
            <el-button @click="onSubmit" icon="el-icon-delete">删除</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="onSubmit" icon="el-icon-download">导入</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="onSubmit" icon="el-icon-upload2">导出</el-button>
          </el-col>
        </el-form-item>

      </el-form>
    </div>
    <div style="margin:10px 20px;">
      <el-table :data="tableData" v-loading="loading">
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

        <el-table-column prop="fullScore" label="分值" width="50">
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
            <el-button type="text" size="small">
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
          <strong>{{showDetailData.id}}.</strong>{{showDetailData.stem}}<strong>({{showDetailData.fullScore}}分)</strong>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-row v-for="(i,index) in showDetailData.options" :key="index">
          <el-col :span="20" style="margin-top:10px;text-indent: 30px;">{{i.title}}</el-col>
        </el-row>
        <el-row>
          <strong>答案：</strong>
          <div v-for="(i,index) in showDetailData.right_answer" :key="index" style="margin-top:10px;text-indent: 30px;">
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
                <el-checkbox-group v-model="getRightAnswer">
                  <el-checkbox v-for="(i,index) in showDetailData.options" :key="index" border :label="i.order_number">
                    {{index | transNumber}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="showDetailData.type==='单选题' ">

                <el-radio-group v-model="showDetailData.right_answer[0].order_number">
                  <el-radio   v-for="(i,index) in showDetailData.options" :key="index" border :label="i.order_number"> {{index | transNumber}}</el-radio>

                </el-radio-group>
              </div>
              <div v-if="showDetailData.type==='判断题'">
                <el-radio-group v-model="showDetailData.right_answer[0].is_right_answer">
                  <el-radio :label="1">正确</el-radio>
                  <el-radio :label="0">错误</el-radio>
                </el-radio-group>
              </div>
              <div v-if="showDetailData.type==='解答题'">

                <el-input type="textarea" :rows="4" placeholder="请输入内容"
                  v-model="showDetailData.right_answer[0].content">
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
export default {
  name: 'allTest',
  data () {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5,
      tableData: [
        {
          id: 1,
          stem: '谁是老大士大夫石帆胜丰的打发打发打发打发打发打发发达法沙发沙发',
          subject: '计算机',
          type: '选择题',
          fullScore: 4,
          difficulty: 2
        }, {
          id: 2,
          stem: '谁是老大',
          subject: '计算机',
          type: '选择题',
          fullScore: 4,
          difficulty: 2
        }, {
          id: 3,
          stem: '谁是老大',
          subject: '计算机',
          type: '选择题',
          fullScore: 4,
          difficulty: 2
        }, {
          id: 1,
          stem: '谁是老大',
          subject: '计算机',
          type: '选择题',
          fullScore: 4,
          difficulty: 2
        }
      ],
      getAllTestOptionsData: [
        {
          difficulty: '2',
          chapter: '第一章',
          right_answer: [
            {
              is_right_answer: 1,
              order_number: 66,
              id: 1,
              title: '"B. 拉斯维加斯算法',
              question_id: 1,
              content: '拉斯维加斯算法'
            },
            {
              is_right_answer: 1,
              order_number: 68,
              id: 1,
              title: 'D. 舍伍德算法',
              question_id: 2,
              content: '舍伍德算法'
            }
          ],
          subject: '算法',
          options: [
            {
              order_number: 65,
              id: 1,
              title: 'A.蒙特卡罗算法',
              question_id: 3,
              content: '蒙特卡罗算法'
            },
            {
              order_number: 66,
              id: 1,
              title: 'B. 拉斯维加斯算法',
              question_id: 1,
              content: '拉斯维加斯算法'
            },
            {
              order_number: 67,
              id: 1,
              title: 'C数值随机化算法',
              question_id: 4,
              content: '数值随机化算法'
            },
            {
              order_number: 68,
              id: 1,
              title: 'D. 舍伍德算法',
              question_id: 2,
              content: '舍伍德算法'
            }
          ],
          id: 1,
          fullScore: 5,
          type: '多选题',
          stem: '1以下随机化算法能得能保证得到的解是正确解的算法是（）'
        },
        {
          difficulty: '2',
          chapter: '第一章',
          right_answer: [
            {
              is_right_answer: 1,
              order_number: 67,
              id: 2,
              title: 'C数值随机化算法',
              question_id: 5,
              content: 'C数值随机化算法'
            }
          ],
          subject: '算法',
          options: [
            {
              order_number: 67,
              id: 2,
              title: 'C数值随机化算法',
              question_id: 5,
              content: 'C数值随机化算法'
            }
          ],
          id: 2,
          fullScore: 5,
          type: '多选题',
          stem: '2以下随机化算法能得能保证得到的解是正确解的算法是（）'
        },
        {
          difficulty: '4',
          chapter: '第一章',
          right_answer: [
            {
              is_right_answer: 1,
              order_number: 67,
              id: 3,
              title: 'C数值随机化算法',
              question_id: 6,
              content: 'C数值随机化算法'
            },
            {
              is_right_answer: 1,
              order_number: 68,
              id: 3,
              title: 'C数值随机化算法',
              question_id: 7,
              content: 'C数值随机化算法'
            }
          ],
          subject: '算法',
          options: [
            {
              order_number: 67,
              id: 3,
              title: 'C数值随机化算法',
              question_id: 6,
              content: 'C数值随机化算法'
            },
            {
              order_number: 68,
              id: 3,
              title: 'C数值随机化算法',
              question_id: 7,
              content: 'C数值随机化算法'
            }
          ],
          id: 3,
          fullScore: 5,
          type: '多选题',
          stem: '3以下随机化算法能得能保证得到的解是正确解的算法是（）'
        }
      ],
      showDetailData: {},
      showDetailDataCopy: {},
      getRightAnswer: [],
      form: {
        search: '',
        name: '',
        questiontype: '0',
        difficulty: '',
        chapter: '',
        subject: '',
        type: [],
        fullScore: '',
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
      dialogUpdateVisible: false
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.loading = true
      this.$api.getAllTest(val, this.pageSize).then(response => {
        this.tableData = response.data.records
        this.tableDatalength = response.data.total
        this.loading = false
        console.log(response.data.records, '是否得到数据')
      })
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
    updateDetail (e) {
      this.dialogUpdateVisible = true
      this.getRightAnswer = JSON.parse(JSON.stringify(this.getRightAnswer)).filter(v => {
        return false
      })
      this.showDetailData = JSON.parse(JSON.stringify(this.getAllTestOptionsData)).filter(v => {
        return v.id === e.id
      })[0]
      this.showDetailData.right_answer.forEach(element => {
        this.getRightAnswer.push(element.order_number)
      })
    },
    cancel () {
      this.dialogUpdateVisible = false
    },
    confirmUpdate () { // 确认修改
      console.log(this.showDetailData.right_answer, 'this si ')
      if (this.showDetailData.type === '多选题') {
        this.showDetailData.right_answer = JSON.parse(JSON.stringify(this.showDetailData.right_answer)).filter(v => {
          return false
        })
        console.log('我是多选题')
        this.showDetailData.options.forEach(v => {
          if (v.order_number === 65) {
            if (this.getRightAnswer.indexOf(65) !== -1) {
              console.log('A正确')
              this.showDetailData.options[0].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[0])
            } else {
              this.showDetailData.options[0].is_right_answer = 0
            }
            v.title = 'A' + v.content
          } if (v.order_number === 66) {
            if (this.getRightAnswer.indexOf(66) !== -1) {
              console.log('b正确')
              this.showDetailData.options[1].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[1])
            } else {
              this.showDetailData.options[1].is_right_answer = 0
            }
            v.title = 'B' + v.content
          } if (v.order_number === 67) {
            if (this.getRightAnswer.indexOf(67) !== -1) {
              console.log('c正确')
              this.showDetailData.options[2].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[2])
            } else {
              this.showDetailData.options[2].is_right_answer = 0
            }
            v.title = 'C' + v.content
          } if (v.order_number === 68) {
            if (this.getRightAnswer.indexOf(68) !== -1) {
              console.log('d正确')
              this.showDetailData.options[3].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[3])
            } else {
              this.showDetailData.options[3].is_right_answer = 0
            }
            v.title = 'D' + v.content
          } if (v.order_number === 69) {
            if (this.getRightAnswer.indexOf(69) !== -1) {
              console.log('e正确')
              this.showDetailData.options[4].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[4])
            } else {
              this.showDetailData.options[4].is_right_answer = 0
            }
            v.title = 'E' + v.content
          } if (v.order_number === 70) {
            if (this.getRightAnswer.indexOf(70) !== -1) {
              console.log('f正确')
              this.showDetailData.options[5].is_right_answer = 1
              this.showDetailData.right_answer.push(this.showDetailData.options[5])
            } else {
              this.showDetailData.options[5].is_right_answer = 0
            }
            v.title = 'F' + v.content
          }
          this.getRightAnswer.daan.push(this.showDetailData.options)
        })
      } else if (this.showDetailData.type === '判断题') {
        this.showDetailData.options[0].content = this.showDetailData.right_answer[0].is_right_answer === 1 ? '正确' : '错误'
        this.showDetailData.options[0].title = this.showDetailData.right_answer[0].is_right_answer === 1 ? '正确' : '错误'
        this.showDetailData.right_answer[0].title = this.showDetailData.right_answer[0].is_right_answer === 1 ? '正确' : '错误'
        this.showDetailData.right_answer[0].content = this.showDetailData.right_answer[0].is_right_answer === 1 ? '正确' : '错误'
      }

      console.log(this.showDetailData, '确认修改')
    },
    isChecked (e) {
      var ee = this.$options.filters.transNumber(e)
      console.log(this.getRightAnswer.indexOf(e), e, this.getRightAnswer)
      // if (this.getRightAnswer.indexOf(e) === -1) {
      //  this.getRightAnswer.push(e)
      // } else {
      // this.getRightAnswer.splice(this.getRightAnswer.indexOf(e), 1)
      // }
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeee', ee, e, this.getRightAnswer)
      // alert(ee, this.getRightAnswer.toString())
    }

    // , handleSizeChange(val) {
    //   this.$emit("handleSizeChange", { page: this.currentPage, limit: val });
    // },
    // handleCurrentChange(val) {
    //   this.$emit("handleCurrentChange", { page: val, limit: this.pageSize });
    // }
  },

  mounted () {
    this.$api.getAllTestOptions().then(response => {
      console.log(response, 'response is', response)
      if (response.status === 500) {
        this.$message.error('服务器连接失败，请刷新在试试')
      } else {
        this.getAllTestOptionsData = response.data.data.alltest
        this.$api.getAllTest(this.currentPage, this.pageSize).then(response => {
          this.tableData = response.data.records
          this.tableDatalength = response.data.total
          this.loading = false
        })
      }
    })
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

  }
}
</script>
<style lang="less" scoped>

</style>
