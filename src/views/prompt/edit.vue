<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="機器人Prompt">
        <el-input v-model="form.prompt" rows="20" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">存檔</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPrompt, editPrompt } from '@/api/chatGpt'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      form: {
        prompt: ''
      },
      result: {},
      loading: false
    }
  },
  created() {
    this.initGptData()
  },
  methods: {
    async initGptData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getPrompt()
        this.form.prompt = result.data.prompt
        loadingInstance.close()
      } catch (error) {
        this.$message(error)
      }
    },
    async onSubmit() {
      this.$message('submit!')
      this.loading = true
      await editPrompt(this.form)
      this.loading = false
      this.$router.push('/prompt/')
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
      this.$router.push('/prompt/')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

