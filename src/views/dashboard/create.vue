<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章標題">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章內容">
        <el-input v-model="form.content" rows="6" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">建立</el-button>
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
        content: ''
      },
      loading: false
    }
  },
  methods: {
    async onSubmit() {
      this.$message('submit!')
      this.loading = true
      await create(this.form)
      this.loading = false
      this.$router.push('/story/')
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
      this.$router.push('/story/')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

