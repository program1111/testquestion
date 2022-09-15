<template>
  <div style="height: 600px;">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="line-height: 50px;margin-left: 20px;">
      <el-tab-pane label="添加题目" name="first">
        <span slot="label">
          <span class="span-box">
            <span class="el-icon-circle-plus"></span>
            <span>添加题目</span>
          </span>
        </span>
        <div>
          <el-form ref="form" :model="form" label-width="70px" :inline="true">
            <el-form-item label="题目类型">
              <el-select v-model="form.questiontype" style="width: 120px;">
                <el-option label="单选题" value="单选题"></el-option>
                <el-option label="多选题" value="多选题"></el-option>
                <el-option label="判断题" value="判断题"></el-option>
                <el-option label="解答题" value="解答题"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科目">
              <el-input v-model="form.subject" style="width: 180px;"></el-input>
            </el-form-item>
            <el-form-item label="所属章节">
              <el-input v-model="form.chapter" style="width: 180px;"></el-input>
            </el-form-item>
            <el-form-item label="分值" label-width="40px">
              <el-input v-model="form.fullScore" style="width: 90px;"></el-input>
            </el-form-item>
            <el-form-item label="难度等级">
              <el-select v-model="form.difficulty" placeholder="请选择级别" style="width: 150px;">
                <el-option label="1级别" value="1"></el-option>
                <el-option label="2级别" value="2"></el-option>
                <el-option label="3级别" value="3"></el-option>
                <el-option label="4级别" value="4"></el-option>
                <el-option label="5级别" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <!--单选题-->
            <div v-show="form.questiontype==='单选题'">
              <el-form :model="form" class="form_class">
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>题目</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form1.stem">
                    </el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">A</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form1.A"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">B</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form1.B"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">C</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form1.C"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">D</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form1.D"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>答案:</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-radio v-model="form.form1.answer" label="65">A</el-radio>
                    <el-radio v-model="form.form1.answer" label="66">B</el-radio>
                    <el-radio v-model="form.form1.answer" label="67">C</el-radio>
                    <el-radio v-model="form.form1.answer" label="68">D</el-radio>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>解析：</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form1.description">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-form>

            </div>
            <!--多选题-->
            <div v-show="form.questiontype==='多选题'">
              <el-form :model="form" class="form_class">
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>题目</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form2.question">
                    </el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">A</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.A"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">B</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.B"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">C</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.C"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">D</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.D"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">E</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.E"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">F</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%" v-model="form.form2.F"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>答案:</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-col :span="20">
                      <el-checkbox-group v-model="form.answer">
                        <el-checkbox label="65" border>A</el-checkbox>
                        <el-checkbox label="66" border>B</el-checkbox>
                        <el-checkbox label="67" border>C</el-checkbox>
                        <el-checkbox label="68" border>D</el-checkbox>
                        <el-checkbox label="69" border>E</el-checkbox>
                        <el-checkbox label="70" border>F</el-checkbox>

                      </el-checkbox-group>
                    </el-col>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>解析：</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form2.description">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-form>

            </div>
            <!--判断题-->
            <div v-show="form.questiontype==='判断题'">
              <el-form :model="form" class="form_class">
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>题目</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form3.stem">
                    </el-input>
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-col :span="2">
                    <el-tag>答案</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-radio v-model="form.form3.answer" label="1">正确</el-radio>
                    <el-radio v-model="form.form3.answer" label="0">错误</el-radio>
                  </el-col>

                </el-form-item>

                <el-form-item>
                  <el-col :span="2">
                    <el-tag>解析</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form3.description">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-form>

            </div>
            <!--解答题-->
            <div v-show="form.questiontype==='解答题'">
              <el-form :model="form" class="form_class">
                <el-form-item>
                  <el-col :span="2">
                    <el-tag>题目</el-tag>
                  </el-col>
                  <el-col :span="20">

                    <quill-editor v-model="form.form4.stem" ref="editorRef" :options="editorOption"
                      @focus="onEditorFocus($event)" @blur="onEditorBlur($event)" @change="onEditorChange($event)"
                      class="editor" style=" line-height: 0px; " />
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-col :span="2">
                    <el-tag>答案</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <quill-editor v-model="form.form4.answer" ref="editorRef" :options="editorOption"
                      @focus="onEditorFocus($event)" @blur="onEditorBlur($event)" @change="onEditorChange($event)"
                      class="editor" style=" line-height: 0px;" />
                  </el-col>
                </el-form-item>

                <el-form-item>
                  <el-col :span="2">
                    <el-tag>解析</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <quill-editor v-model="form.form4.description" ref="editorRef" :options="editorOption"
                      @focus="onEditorFocus($event)" @blur="onEditorBlur($event)" @change="onEditorChange($event)"
                      class="editor" style=" line-height: 0px;" />
                  </el-col>
                  <!-- <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.form4.description">
                    </el-input> -->
                  <!-- </el-col> -->
                </el-form-item>
              </el-form>

            </div>
            <el-button type="primary" @click="onSubmit">立即提交</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="导入题库" name="second">
        <span slot="label">
          <span class="span-box">
            <span class="el-icon-folder-opened"></span>
            <span>导入题库</span>
          </span>
        </span>
        <div style="margin-top: 20px;">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过500kb</div>
            <div class="el-upload__tip" slot="tip">导入的注意事项：字段必须以这种形式书写：题目类型，所属科目，正确答案</div>
          </el-upload>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>

</template>
<script>
import { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ header: 1 }, { header: 2 }],
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }],
  // [{ size: ['small', false, 'large', 'huge'] }], // 配置字号
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  // [{ font: [] }], // 显示字体选择
  [{ align: [] }], // 对齐方式-----
  ['clean'], // 清除文本格式-----
  ['image'] // 链接、图片、视频-----
]

export default {
  name: 'addTest',
  data () {
    return {
      activeName: 'first',
      form: {
        name: '',
        questiontype: '单选题',
        difficulty: '',
        chapter: '',
        subject: '',
        type: [],
        fullScore: '',
        resource: '',
        answer: [],
        // stem: '',
        description: '',
        form1: { // 单选题
          stem: '', // 题目
          A: '',
          B: '',
          C: '',
          D: '',
          daan: [],
          answer: '',
          description: '',
          chapter: '',
          subject: '',
          difficulty: '',
          type: '',
          fullScore: ''
        },
        form2: { // 多选题
          stem: '',
          A: '',
          B: '',
          C: '',
          D: '',
          E: '',
          F: '',
          daan: [],
          answer: [],
          description: '',
          chapter: '',
          subject: '',
          difficulty: '',
          type: '',
          fullScore: ''
        },
        form3: { // 判断题
          stem: '11',
          type: '',
          answer: '',
          description: '',
          chapter: '',
          subject: '',
          daan: [],
          difficulty: '',
          fullScore: ''
        },
        form4: { // 解答题
          stem: '11',
          chapter: '',
          subject: '',
          answer: '',
          daan: [],
          description: '',
          difficulty: '',
          fullScore: ''

        }

      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      input: '',
      editorOption: {

        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }

      },
      content: 'qwe'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      if (this.form.questiontype === '单选题') {
        this.form.form1.chapter = this.form.chapter
        this.form.form1.subject = this.form.subject
        this.form.form1.difficulty = this.form.difficulty
        this.form.form1.type = this.form.questiontype
        this.form.form1.fullScore = this.form.fullScore
        this.form.form1.daan.push({ id: 0, isRightAnswer: this.form.form1.answer === '65' ? 1 : 0, title: 'A.' + this.form.form1.A, orderNumber: 65, content: this.form.form1.A })
        this.form.form1.daan.push({ id: 0, isRightAnswer: this.form.form1.answer === '66' ? 1 : 0, title: 'B.' + this.form.form1.B, orderNumber: 66, content: this.form.form1.B })
        this.form.form1.daan.push({ id: 0, isRightAnswer: this.form.form1.answer === '67' ? 1 : 0, title: 'C.' + this.form.form1.C, orderNumber: 67, content: this.form.form1.C })
        this.form.form1.daan.push({ id: 0, isRightAnswer: this.form.form1.answer === '68' ? 1 : 0, title: 'D.' + this.form.form1.D, orderNumber: 68, content: this.form.form1.D })
        this.$api.addTest(this.form.form1).then(response => {
          // console.log(response + 'ddd')
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else {
            this.$message.success(response.data.data.message)
          }
        })
        this.clearData()
      } else if (this.form.questiontype === '多选题') {
        this.form.form2.chapter = this.form.chapter
        this.form.form2.subject = this.form.subject
        this.form.form2.difficulty = this.form.difficulty
        this.form.form2.type = this.form.questiontype

        this.form.form2.fullScore = this.form.fullScore
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('65') !== -1 ? 1 : 0, title: 'A.' + this.form.form2.A, orderNumber: 65, content: this.form.form2.A })
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('66') !== -1 ? 1 : 0, title: 'B.' + this.form.form2.B, orderNumber: 66, content: this.form.form2.B })
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('67') !== -1 ? 1 : 0, title: 'C.' + this.form.form2.C, orderNumber: 67, content: this.form.form2.C })
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('68') !== -1 ? 1 : 0, title: 'D.' + this.form.form2.D, orderNumber: 68, content: this.form.form2.D })
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('69') !== -1 ? 1 : 0, title: 'E.' + this.form.form2.D, orderNumber: 69, content: this.form.form2.E })
        this.form.form2.daan.push({ id: 0, isRightAnswer: this.form.answer.indexOf('70') !== -1 ? 1 : 0, title: 'F.' + this.form.form2.D, orderNumber: 70, content: this.form.form2.F })
        this.form.form2.answer = this.form.answer.toString()
        // console.log(this.form.form2, 'this.form.form2')
        this.$api.addTest(this.form.form2).then(response => {
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else {
            this.$message.success(response.data.data.message)
          }
        })
        this.clearData()
      } else if (this.form.questiontype === '判断题') {
        this.form.form3.chapter = this.form.chapter
        this.form.form3.subject = this.form.subject
        this.form.form3.difficulty = this.form.difficulty
        this.form.form3.type = this.form.questiontype
        this.form.form3.fullScore = this.form.fullScore

        this.form.form3.daan.push({ id: 0, isRightAnswer: this.form.form3.answer, title: this.form.form3.answer === '1' ? '正确' : '错误', orderNumber: 65, content: this.form.form3.answer === '1' ? '正确' : '错误' })
        console.log(this.form.form3, '这是form3')
        this.$api.addTest(this.form.form3).then(response => {
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else {
            console.log(response, 'response')
            this.$message.success(response.data.data.message)
            // this.$message.success('response.data.data.message')
          }
        })
        this.clearData()
      } else if (this.form.questiontype === '解答题') {
        this.form.form4.chapter = this.form.chapter
        this.form.form4.subject = this.form.subject
        this.form.form4.difficulty = this.form.difficulty
        this.form.form4.type = this.form.questiontype
        this.form.form4.fullScore = this.form.fullScore
        this.form.form4.daan.push({ id: 0, isRightAnswer: 1, title: this.form.form4.answer, orderNumber: 65, content: this.form.form4.answer })
        this.$api.addTest(this.form.form4).then(response => {
          if (response.status === 500) {
            this.$message.error('服务器连接失败，请刷新在试试')
          } else {
            this.$message.success(response.data.data.message)
          }
        })
        this.clearData()
      }
    },
    clearData () {
      for (const key in this.form) {
        if (key === 'questiontype') {

        } else if (key === 'form1') {
          for (const key1 in this.form.form1) {
            if (key1 === 'daan') {
              this.form.form1[key1] = []
            } else this.form.form1[key1] = ''
          }
        } else if (key === 'form2') {
          for (const key2 in this.form.form3) {
            if (key2 === 'daan') {
              this.form.form3[key2] = []
            } else this.form.form2[key2] = ''
          }
        } else if (key === 'form3') {
          for (const key3 in this.form.form3) {
            if (key3 === 'daan') {
              this.form.form3[key3] = []
            } else this.form.form3[key3] = ''
          }
        } else if (key === 'form4') {
          for (const key4 in this.form.form4) {
            if (key4 === 'daan') {
              this.form.form4[key4] = []
            } else this.form.form4[key4] = ''
          }
        } else { this.form[key] = '' }
      }
    },
    // 准备富文本编辑器
    onEditorReady () { },
    // 富文本编辑器 失去焦点事件
    onEditorBlur () { },
    // 富文本编辑器 获得焦点事件
    onEditorFocus () { },
    // 富文本编辑器 内容改变事件
    onEditorChange ({ html }) {
      // 内容改变事件
      // console.log('内容改变事件');
    }
  },
  watch: {
    'form.questiontype' (newVal, oldVal) {
      // this.form.stem = ''
      // console.log('questiontype')
    }
  },
  computed: {
    // 当前富文本实例
    editor () {
      return this.$refs.editorRef.quillEditor
    }
  }
}
</script>
<style scoped>

</style>
