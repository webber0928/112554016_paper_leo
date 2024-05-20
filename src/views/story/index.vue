<template>
  <div class="chatroom-container">
    <div class="chatroom-text">
      <el-container>
        <el-header>
          <div>
            <el-button type="text" plain @click="$router.push('/story')">返回</el-button>
          </div>
          學號: {{ username }}
        </el-header>
        <el-row>
          <el-col :sm="12" :md="14" :xl="16">
            <div class="grid-content bg-purple-dark">
              <el-row>
                <el-col :span="24">
                  <div class="bg-purple-dark my-story">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>故事標題: <b>{{ myStoryTitle }}</b></span>
                      </div>
                      <div ref="myStory">
                        <div v-if="myStory" class="text item" v-html="myStory" />
                        <div v-else class="text item">
                          <el-skeleton :rows="6" />
                        </div>
                        <audio id="tts-audio" ref="audio" controls style="display: none" src="https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=apple" />
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :sm="12" :md="10" :xl="8">
            <div class="my-chat bg-purple-dark">
              <el-card class="box-card">
                <div ref="chatBox" class="container">
                  <div v-for="(item, index) in historyItems" :key="index" class="history-item" :class="`${item.role === 'user'? 'user': 'model'}-role`">
                    <div class="name">{{ item.role === 'user'? '你': '小夥伴' }}</div>
                    <blockquote>{{ item.content | replacedText }}</blockquote>
                  </div>
                </div>
                <div class="form-container">
                  <div id="form">
                    <div class="el-input">
                      <input v-model="form.prompt" class="el-input__inner" type="text" @keyup.enter="onSubmit">
                    </div>
                    <el-button type="primary" @click="onSubmit">送出</el-button>
                  </div>
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
import { initGpt2, sendMessage } from '@/api/chatGpt'
import { getOne, triggerPlay, triggerOpen } from '@/api/story'
import { Loading } from 'element-ui'

export default {
  name: 'Chatroom',
  filters: {
    replacedText(value) {
      return value.replace(/\((.*?)\)/g, '')
    }
  },
  data() {
    return {
      items: '',
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
      wordObj: {},
      selectWords: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'username'])
  },
  mounted() {
    this.$refs.myStory.addEventListener('copy', (event) => {
      event.preventDefault()
      alert(`不可以壞壞`)
    })

    // 使用事件委托监听动态生成的按钮点击事件
    this.$refs.myStory.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        this.handleClick(event.target.textContent)
      }
    })
  },
  created() {
    this.initGptData(this.$route.params.id)
  },
  methods: {
    scrollToBottom() {
      const chatBox = this.$refs.chatBox
      setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight }, 150)
    },
    async initGptData(id) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await getOne(id)
        loadingInstance.close()
        this.itemObj = result.data
        this.myStoryTitle = result.data.title
        this.myStory = this.textFormat(result.data.content, result.data.words || [])

        this.initData = {
          role: 'assistant',
          content: result.data.content
        }
        this.initGptData2(this.initData)
      } catch (error) {
        this.$message(error)
      }
    },
    async initGptData2(initData) {
      try {
        const loadingInstance = Loading.service({ fullscreen: true })
        const result = await initGpt2({
          message: initData,
          username: this.username,
          storyId: this.$route.params.id
        })
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
    textFormat(text, words) {
      console.log(words)
      words.forEach(word => {
        const key = word.split(' ')[0]
        const value = word.split(' ')[1]
        this.wordObj[key] = value
        const newRegex = new RegExp(key, 'g')
        text = text.replace(newRegex, `<button @click="handleClick">${key}</button>`)
      })
      text = text.replace(/\n/g, '<br>')
      return text
    },
    async onSubmit() {
      const content = this.form.prompt
      if (!content) return
      this.historyItems.push({
        role: 'user',
        content: content
      })
      this.scrollToBottom()
      try {
        this.$message({
          type: 'info',
          message: '訊息已發送'
        })
        this.form.prompt = ''
        const historyItems = [this.initData].concat(this.historyItems)
        const result = await sendMessage({
          messages: historyItems,
          username: this.username,
          storyId: this.$route.params.id
        })
        const content = result.data.choices[0].message.content

        this.historyItems.push({
          role: result.data.choices[0].message.role,
          content: content
        })
        this.scrollToBottom()
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
    },
    handleClick(key) {
      this.selectWords = key
      this.$alert(`
        <h2>${key}: ${this.wordObj[key]}</h2>
        <button id="playButton">播放</button>
        `, '單字卡', {
        dangerouslyUseHTMLString: true,
        callback: () => {
          document.getElementById('playButton').removeEventListener('click', this.playClick)
        }
      })

      triggerOpen({
        word: key,
        user_no: this.username,
        story_id: this.$route.params.id
      })

      this.$nextTick(() => {
        document.getElementById('playButton').addEventListener('click', this.playClick)
      })
    },
    playClick() {
      const audio = this.$refs.audio
      audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${this.selectWords}`
      console.log(audio.src)
      audio.playbackRate = 0.8
      audio.volume = 1
      audio.play()
      triggerPlay({
        word: this.selectWords,
        user_no: this.username,
        story_id: this.$route.params.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.el-card {
  min-width: 100%;
  height: 100%;
  margin: auto;
  position: relative;

  .el-card__body {
    height: 100%;
  }
}

.container {
  // padding-bottom: 80px;
  overflow: auto;
  height: 100%;
}

.form-container {
  background: #fff;
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
  height: calc(100vh - 60px);
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.my-story {
  height: calc(100vh - 60px);
  padding: 20px 20px 20px 20px;
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
  // white-space: break-spaces;
}
.chatroom-text ::v-deep {
  -webkit-user-select:none;
  -moz-user-select:none;
  -o-user-select:none;
  user-select:none;
  .el-card .el-card__body {
    height: 100%;
    overflow: auto;
    padding-bottom: 100px;
  }

}

</style>
