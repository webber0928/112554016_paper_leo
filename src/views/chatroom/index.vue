<template>
  <div class="chatroom-container">
    <div class="chatroom-text">
      <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet">
      <link href="https://zpix.vercel.app/app.css" rel="stylesheet">
      <el-container>
        <el-header>name: {{ name }}</el-header>
        <el-container>
          <el-main>
            <blockquote v-if="itemObj">{{ itemObj.choices[0].message.content }}</blockquote>
          </el-main>
          <el-aside width="50%">
            <el-card class="box-card">
              <div class="container">
                <div v-for="(item, index) in historyItems" :key="index" class="history-item" :class="`${item.role === 'user'? 'user': 'model'}-role`">
                  <div class="name">{{ item.role === 'user'? '你': '小夥伴' }}</div>
                  <blockquote>{{ item.content }}</blockquote>
                </div>
              </div>
              <div class="form-container">
                <form id="form">
                  <el-input v-model="form.prompt" type="textarea" />
                  <el-button type="primary" @click="onSubmit">送出</el-button>
                </form>
              </div>
            </el-card>
          </el-aside>
        </el-container>
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
      initData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
// .chatroom {
//   &-container {
//     margin: 30px;
//   }

//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }

html,
body,
pre,
code,
kbd,
samp {
  font-family: ZpixReviewLocal, ZpixReviewOnline, sans-serif;
}

.container,
header,
.form-container {
  margin: 0 auto;
  max-width: 700px;
}

.el-card {
  width: 560px;
  height: 100%;
  margin: auto;
}

.form-container {
  margin-top: 15px;
  border-top: 2px solid rgb(127, 127, 127, 0.5);
}

img.thumb {
  border: 1px solid grey;
  border-radius: 8px;
  height: 100px;
  margin: 0px 16px 16px 0;
  padding: 2px;
  width: 100px;
}

#form,
.history-item {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

#file {
  flex-grow: 0;
}

#prompt {
  margin: 4px;
  padding: 2px;
  width: 100%;
}

// button {
//   padding: 2px 16px;
//   width: 90px;
// }

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

.history-item>blockquote {
  flex-grow: 1;
  margin: 0;
}
blockquote {
  white-space: break-spaces;
}
</style>
