<template>
  <div class="dashboard-container">
    <div class="dashboard-text">學號: {{ username }}</div>
    <el-row :gutter="20">
      <el-col
        v-for="item in items"
        :key="item.id"
        :span="4"
        style="margin-top: 15px"
      >
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px">
              <p>
                <b>{{ item.user_no }}</b>
              </p>
              <p>
                群組:
                <b>{{ item.group == "teacher" ? item.group : `${item.user_no[0]}${item.user_no[1]}` }}</b>
              </p>
              <p>
                次數: <b>{{ item.count }}</b>
              </p>
              <div
                class="bottom clearfix"
                style="text-align: center;margin-top: 10px"
              >
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
import { getInfo } from '@/api/message'

export default {
  name: 'Dashboard',
  data() {
    return {
      items: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  created() {
    this.initData(this.$route.params.id)
  },
  methods: {
    async initData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getInfo()
        loadingInstance.close()
        this.items = result.data
      } catch (error) {
        this.$message(error)
      }
    },
    async go(id) {
      try {
        this.$router.push('/teacher/user/' + id)
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
