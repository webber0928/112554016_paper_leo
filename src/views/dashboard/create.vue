<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章標題">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章內容">
        <el-input v-model="form.content" rows="6" type="textarea" />
      </el-form-item>
      <el-form-item label="單字卡">
        <el-tag
          v-for="tag in form.words"
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
        <el-button v-else class="button-new-tag" @click="showInput">+ 新增單字</el-button>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">存檔</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/story'
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        words: []
      },
      loading: false,
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.$message('submit!')
        this.loading = true
        await create(this.form)
        this.loading = false
        this.$router.push('/story/')
      } catch (error) {
        this.loading = false
      }
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
      this.$router.push('/story/')
    },
    handleClose(tag) {
      this.form.words.splice(this.form.words.indexOf(tag), 1)
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
        if (this.form.words.indexOf(inputValue) === -1) {
          this.form.words.push(inputValue)
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

