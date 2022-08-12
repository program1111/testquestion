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
              <el-select v-model="form.questiontype" placeholder="请选择类型">
                <el-option label="单选题" value="0"></el-option>
                <el-option label="多选题" value="1"></el-option>
                <el-option label="判断题" value="2"></el-option>
                <el-option label="解答题" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科目">
              <el-input v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item label="所属章节">
              <el-input v-model="form.chapter"></el-input>
            </el-form-item>
            <el-form-item label="难度等级">
              <el-select v-model="form.gradediffculty" placeholder="请选择级别">
                <el-option label="1级别" value="0"></el-option>
                <el-option label="2级别" value="1"></el-option>
                <el-option label="3级别" value="2"></el-option>
                <el-option label="4级别" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="正确答案">

              <el-input v-model="form.rightanswer"></el-input>

            </el-form-item>

          </el-form>
          <div>
            <div>
              <el-form :model="form"   class="form_class">
                <el-form-item>
                  <el-col :span="2">
                    <el-tag >题目</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="form.question">
                  </el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">A</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">B</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">C</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2">
                    <el-tag type="success">D</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-input style="width:100%"></el-input>
                  </el-col>
                </el-form-item>
                  <el-form-item>
                <el-col :span="2">
                  <el-tag >解析：</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="form.analysis">
                </el-input>
                </el-col>
              </el-form-item>
              </el-form>

              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>

            </div>
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
          <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
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
export default {
  name: 'addTest',
  data () {
    return {
      activeName: 'first',
      form: {
        name: '',
        questiontype: '',
        gradediffculty: '',
        chapter: '',
        subject: '',
        type: [],
        resource: '',
        rightanswer: '',
        question: '',
        analysis: ''
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
    }
  }
}
</script>
<style scoped>

</style>
