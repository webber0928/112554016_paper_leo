<template>
  <div class="dashboard-container">
    <div class="dashboard-text">學號: {{ username }}</div>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in items" :key="item.id" :span="8">
        <div class="grid-content bg-purple">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>文章標題: <b>{{ item.title }}</b></span>
              <div class="bottom clearfix" style="text-align: center;margin-top: 10px;">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button" @click="go(index)">進入</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- <el-card class="box-card">
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
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="role" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.role }}
          </template>
        </el-table-column>
        <el-table-column label="content">
          <template slot-scope="scope">
            <code style="white-space: break-spaces;">{{ scope.row.content }}</code>
          </template>
        </el-table-column>
        <el-table-column label="Pageviews" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Display_time" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import { getList } from '@/api/story'

export default {
  name: 'Dashboard',
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
    async go(index) {
      try {
        this.$router.push('/story/' + (index + 1))
      } catch (error) {
        this.$message(error)
      }
    }
  },
  data() {
    return {
      items: [],
      list: [
      {
            "role": "system",
            "content": "你是一位富有創意的國小五年級英文老師 目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式"
          },
          {
            "role": "user",
            "content": "目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式 學習內容： park, library, hospital, supermarket, bookstore, tea shop, post office, zoo, Where are you going? I’m going to the _______. Where’s the ________? It’s on ____ Road. It’s next to the zoo."
          },
          {
            'role': 'assistant',
            'content': '$故事'
          },{
            'role': 'system',
            'content': `您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確。讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下三點為主軸。並且每次只能有一個問題以英文詢問，並且告訴我你選擇哪一個:1. 真實性問題（表層理解的問題）：如問what、when、where、how和who等事實性問題。2. 比較及對照文章訊息（推論的問題）：如問「which one is true/false」3. 整合分析類問題（深層理解的問題）：如問「why」等問題。規則: 1.開始直接就詢問小學生第一個跟故事有關的內容了2.在整個對話中，真實性問題至少要問過兩次，比較或整合一次，你直接選擇最合適的，不需要讓小朋友知道，例如:用'(真實)'呈現在問號後面3.一次只能問一個問題，一次只能問一個問題4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以以完整回答提示學生以幫助確定答案。7. 學生看不懂題目或故事可以以中文提示學生，但不要直接給予答案`
          }],
      listLoading: false
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
