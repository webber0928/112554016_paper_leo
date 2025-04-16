<template>
  <div class="dashboard-container">
    <div class="dashboard-text">學號: {{ user_no }}</div>
    <el-row :gutter="20">
      <el-col
        v-for="(items, key) in obj"
        :key="key"
        :span="24"
        style="margin-top: 15px"
      >
        <h1>{{ items[0].dateDay }}</h1>
        <el-table
          :data="items"
          max-height="450"
          border
          style="width: 100%"
          fit
          highlight-current-row
          :row-class-name="tableRowClassName"
        >
          <el-table-column align="center" label="時間" width="180">
            <template slot-scope="scope">
              {{ scope.row.dateDay }} {{ scope.row.dateTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="角色" width="80">
            <template slot-scope="scope">
              {{ scope.row.message.role === 'user' ? '學生' : 'BOT' }}
            </template>
          </el-table-column>
          <el-table-column label="對話">
            <template slot-scope="scope">
              <div class="blockquote">
                {{ scope.row.message.content }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px">
              <div ref="chatBox" class="container">
                <div v-for="(item, index) in items" :key="index" class="history-item">
                  <div v-if="item.message.role == 'user'" :class="`${!item.isBot? 'user': 'model'}-role`">
                    <div class="name">{{ !item.isBot? '你': '小夥伴' }} <i>{{ `${item.dateTime}` }}</i></div>
                    <blockquote>{{ item.message.content | replacedText }}</blockquote>
                  </div>
                  <div v-if="item.message.role == 'assistant'" :class="`${!item.isBot? 'user': 'model'}-role`">
                    <div class="name">{{ !item.isBot? '你': '小夥伴' }} <i>{{ `${item.dateTime}` }}</i></div>
                    <blockquote>{{ item.message.content | replacedText }}</blockquote>
                  </div>
                  <div v-if="item.message.role == 'system'" :class="`${!item.isBot? 'user': 'model'}-role`">--------------------------------</div>
                </div>
              </div>
            </div>
          </el-card>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getUser } from '@/api/message'

export default {
  name: 'Dashboard',
  filters: {
    replacedText(value) {
      return value
      // return value.replace(/\((.*?)\)/g, '')
    }
  },
  data() {
    return {
      obj: {},
      listLoading: false,
      user_no: ''
    }
  },
  computed: {
    ...mapGetters([
      'name', 'username', 'token', 'userId'
    ])
  },
  created() {
    this.initData(this.$route.params.id)
  },
  methods: {
    async initData(id) {
      try {
        const self = this
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getUser(id)
        loadingInstance.close()
        result.data.forEach(item => {
          self.user_no = item.user
          if (!this.obj[item.dateDay]) this.$set(this.obj, item.dateDay, [])
          this.obj[item.dateDay].push(item)
        })
        // this.items = result.data
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
    },
    tableRowClassName({ row, rowIndex }) {
      console.log('L110', row)
      if (row.message.role === 'user') {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

blockquote {
  margin: 0;
}

.history-item {
  padding: 0 8px 0 0;
  // padding: 16px 0;
}

.history-item > .model-role {
  background: rgba(127, 127, 127, 0.1);
}

.history-item blockquote {
  padding: 7px 13px;
  flex-grow: 1;
  margin: 0 0 7px 0;
}
::v-deep {
  .el-table .warning-row {
    background: #f0f9eb;
  }
  .blockquote {
    white-space: break-spaces;
  }
}
</style>
