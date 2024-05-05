<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Prompt</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <el-button type="text" plain @click="$router.push('/prompt/edit')">編輯</el-button>
        </el-table-column>
        <el-table-column label="role" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column label="content">
          <template slot-scope="scope">
            <code style="white-space: break-spaces;">{{ scope.row.prompt }}</code>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Display_time" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updatedAt }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPrompt } from '@/api/chatGpt'

import { Loading } from 'element-ui'

export default {
  data() {
    return {
      list: [],
      listLoading: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getPrompt()
        loadingInstance.close()
        this.list = [result.data]
      } catch (error) {
        this.$message(error)
      }
    },
    async go(index) {
      try {
        this.$router.push('/story/' + (index + 1))
      } catch (error) {
        this.$message(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
