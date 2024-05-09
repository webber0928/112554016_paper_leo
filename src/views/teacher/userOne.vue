<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col
        v-for="(items, key) in obj"
        :key="key"
        :span="12"
        style="margin-top: 15px"
      >
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px">
              <div ref="chatBox" class="container">
                <div v-for="(item, index) in items" :key="index" class="history-item">
                  <!-- <div v-if="index == 1" :class="`${!item.isBot? 'user': 'model'}-role`">
                    <blockquote style="background: #00ff2b3b;padding: 10px 20px;">{{ item.message.content | replacedText }}</blockquote>
                  </div> -->
                  <div v-if="item.message.role == 'user'" :class="`${!item.isBot? 'user': 'model'}-role`">
                    <div class="name">{{ !item.isBot? '你': '小夥伴' }} {{ `<${item.dateTime}>` }}</div>
                    <blockquote>{{ item.message.content | replacedText }}</blockquote>
                  </div>
                  <div v-if="item.message.role == 'assistant'" :class="`${!item.isBot? 'user': 'model'}-role`">
                    <div class="name">{{ !item.isBot? '你': '小夥伴' }} {{ `<${item.dateTime}>` }}</div>
                    <blockquote>{{ item.message.content | replacedText }}</blockquote>
                  </div>
                  <div v-if="item.message.role == 'system'" :class="`${!item.isBot? 'user': 'model'}-role`">--------------------------------</div>
                </div>
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
    async initData(id) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getUser(id)
        loadingInstance.close()
        result.data.forEach(item => {
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
blockquote {
  white-space: break-spaces;
}
</style>
