<template>
  <div class="app-container">
    <div class="chatroom-text">
      <el-container>
        <el-header>
          <div>
            <el-button type="text" plain @click="$router.push('/story')">返回</el-button>
          </div>
        </el-header>
        <el-row>
          <el-col>
            <h2 style="text-align: center;">文章修改</h2>
            <br>
          </el-col>
          <el-col>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="編號">
                <el-input v-model="form.ranking" />
              </el-form-item>
              <el-form-item label="文章標題">
                <el-input v-model="form.title" />
              </el-form-item>
              <el-form-item label="文章內容">
                <el-input v-model="form.content" rows="7" type="textarea" />
              </el-form-item>
              <el-form-item label="Prompt">
                <el-input v-model="form.prompt" rows="7" type="textarea" />
              </el-form-item>
              <el-form-item label="連結">
                <el-tag
                  v-for="tag in form.link"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" @click="showInput">+ 新增連結</el-button>
              </el-form-item>
              <el-form-item>
                <el-button :loading="loading" type="primary" @click="onSubmit">存檔</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getOne, updateOne } from '@/api/story'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        prompt: '',
        ranking: '',
        link: []
      },
      loading: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  created() {
    this.initGptData(this.$route.params.id)
  },
  methods: {
    async initGptData(id) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getOne(id)
        loadingInstance.close()
        // this.itemObj = result.data
        this.form.title = result.data.title
        this.form.content = result.data.content
        this.form.ranking = result.data.ranking
        this.form.prompt = result.data.prompt
        this.form.link = result.data.link || []

        this.initData = {
          role: 'assistant',
          content: result.data.content
        }
        this.initGptData2(this.initData)
      } catch (error) {
        this.$message(error)
      }
    },
    async onSubmit() {
      this.$message('submit!')
      this.loading = true
      await updateOne(this.$route.params.id, this.form)
      this.loading = false
      this.$router.push('/story/')
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
      this.$router.push('/story/')
    },
    handleClose(tag) {
      this.form.link.splice(this.form.link.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.form.link.indexOf(inputValue) === -1) {
          this.form.link.push(inputValue)
        } else {
          this.$message({
            type: 'warn',
            message: `${inputValue} 已經重複瞜`
          })
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  width: 150px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

