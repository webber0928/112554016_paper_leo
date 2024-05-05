<template>
  <div class="dashboard-container">
    <div class="dashboard-text">學號: {{ username }}</div>
    <el-row :gutter="20">
      <el-col v-for="item in items" :key="item.id" :span="8" style="margin-top: 15px;">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>文章標題: <b>{{ item.title }}</b></span>
              <!-- <div>{{ item.content }}</div> -->
              <div class="bottom clearfix" style="text-align: center;margin-top: 10px;">
                <el-button type="text" class="button" @click="go(item.id)">進入</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getList } from '@/api/story'

export default {
  name: 'Dashboard',
  data() {
    return {
      items: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'name', 'username'
    ])
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getList()
        loadingInstance.close()
        this.items = result.data.items
      } catch (error) {
        this.$message(error)
      }
    },
    async go(id) {
      try {
        this.$router.push('/story/' + id)
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
