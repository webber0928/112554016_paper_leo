<template>
  <div class="chatroom-container">
    <div class="chatroom-text">
      <link
        href="https://unpkg.com/nes.css@latest/css/nes.min.css"
        rel="stylesheet"
      />
      <link href="https://zpix.vercel.app/app.css" rel="stylesheet" />
      <el-container>
        <el-header>name: {{ name }}</el-header>
        <el-row>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-row>
                <el-col :span="24">
                  <div class="bg-purple-dark my-story">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>故事標題</span>
                      </div>
                      <div class="text item" v-if="myStory">
                        {{ myStory }}
                      </div>
                      <div class="text item" v-else>
                        <!-- <el-skeleton :rows="6"/> -->
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="bg-purple-dark my-scaffolding">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>詢問方法</span>
                      </div>
                      <div class="text item">根據故事的內容做詢問</div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="my-chat bg-purple-dark">
              <el-card class="box-card">
                <div class="container">
                  <div v-for="(item, index) in historyItems" :key="index" class="history-item" :class="`${item.role === 'user'? 'user': 'model'}-role`">
                    <div class="name">{{ item.role === 'user'? '你': '小夥伴' }}</div>
                    <blockquote>{{ item.content }}</blockquote>
                  </div>
                </div>
                <div class="form-container">
                  <form id="form">
                    <div class="el-input">
                      <input v-model="form.prompt" class="el-input__inner" type="text" @keyup.enter="onSubmit" />
                    </div>
                    <el-button type="primary" @click="onSubmit">送出</el-button>
                  </form>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initGpt, initGpt2, sendMessage } from '@/api/chatGpt'
import { Loading } from 'element-ui'

export default {
  name: 'Chatroom',
  data() {
    return {
      itemObj: '',
      story: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        prompt: ''
      },
      historyItems: [],
      initData: [],
      myStory: null,
      myStoryTitle: null,
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.initGptData()
  },
  methods: {
    async initGptData() {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await initGpt()
        loadingInstance.close()
        this.itemObj = result.data
        this.myStory = result.data.choices[0].message.content

        const titleRegex = /Title:\s*(.*)/
        const match = this.myStory.match(titleRegex)
        this.myStoryTitle = match ? match[1] : "Title not found"
        this.myStory = this.myStory.split('\n\n').slice(1).join('\n\n')

        this.initData = {
          role: result.data.choices[0].message.role,
          content: result.data.choices[0].message.content
        }
        this.initGptData2(this.initData)
      } catch (error) {
        this.$message(error)
      }
    },
    async initGptData2(initData) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await initGpt2(initData)
        loadingInstance.close()
        this.story = result.data
        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: result.data.choices[0].message.content
        })
        this.$message({
          type: 'success',
          message: '學生已登入成功！'
        })
      } catch (error) {
        this.$message(error)
      }
    },
    async onSubmit() {
      const content = this.form.prompt
      if (!content) return
      this.historyItems.push({
        role: 'user',
        content: content
      })
      try {
        this.$message({
          type: 'info',
          message: '訊息已發送'
        })
        this.form.prompt = ''
        const historyItems = [this.initData].concat(this.historyItems)
        const result = await sendMessage(historyItems)
        console.log(result, 'succesUpdateRes')
        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: result.data.choices[0].message.content
        })
      } catch (error) {
        this.$message(error)
      }
      // this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  font-family: ZpixReviewLocal, ZpixReviewOnline, sans-serif;
}

.el-card {
  min-width: 460px;
  height: 100%;
  margin: auto;
  position: relative;

  .el-card__body {
    height: 100%;
  }
}

.form-container {
  margin-top: 15px;
  border-top: 2px solid rgb(127, 127, 127, 0.5);
}

#form,
.history-item {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
.form-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: auto;
  left: 0px;
  padding: 5px 15px;
}

// #file {
//   flex-grow: 0;
// }

// #prompt {
//   margin: 4px;
//   padding: 2px;
//   width: 100%;
// }

button {
  margin: 0 14px;
  // width: 90px;
}

.name {
  flex-shrink: 0;
  font-size: 80%;
  margin: 16px 16px 16px 0;
  opacity: 0.5;
  text-align: right;
  width: 50px;
}

blockquote {
  margin: 0;
}

.history-item {
  padding: 0 8px 0 0;
}

.history-item.model-role {
  background: rgba(127, 127, 127, 0.1);
}

.history-item > blockquote {
  flex-grow: 1;
  margin: 0;
}
blockquote {
  white-space: break-spaces;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
  min-height: 36px;
  height: 50%;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.my-chat {
  // border-radius: 4px;
  min-height: 36px;
  height: calc(100vh - 110px);
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.my-story {
  height: 50vh;
  padding: 20px 20px 0 20px;
}
.my-scaffolding {
  height: calc(50vh - 130px);
  padding: 0 20px 20px 20px;
}

.text.item {
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  text-align: justify;
  white-space: break-spaces;
}
.chatroom-text ::v-deep {
  .el-card .el-card__body {
    height: 100%;
  }

}

</style>
