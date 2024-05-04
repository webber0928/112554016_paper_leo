const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(morgan(':date[clf] :method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: true }))

// 自定義日誌中間件
app.use((req, res, next) => {
  console.log(`Received request for ${req.method} ${req.url}`)

  // 記錄請求主體
  console.log('Request Body:', req.body)

  // 攔截和記錄響應
  const oldSend = res.send
  res.send = function(data) {
    console.log('Response Body:', data)
    oldSend.apply(res, arguments)
  }

  next()
})

// user 使用
const tokens = require('./data/token.js')
const users = require('./data/users.js')

const API_KEY = '$API_KEY'
app.post('/dev-api/user/login', (req, res) => {
  const { username } = req.body
  const token = tokens[username]
  if (!token) {
    return res.json({
      code: 60204,
      message: 'Account and password are incorrect.'
    })
  }

  return res.json({ code: 20000, data: token })
})

app.get('/dev-api/user/info', (req, res) => {
  const { token } = req.query
  const info = users[token]
  if (!info) {
    return res.json({
      code: 50008,
      message: 'Login failed, unable to get user details.'
    })
  }
  return res.json({ code: 20000, data: info })
})

app.post('/dev-api/user/logout', (req, res) => {
  return res.json({ code: 20000, data: 'success' })
})

// table 使用
const Mock = require('mockjs')

const mpckData = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

app.get('/dev-api/table/list', (req, res) => {
  const items = mpckData.items
  return res.json({ code: 20000, data: {
    total: items.length,
    items: items
  }})
})

app.get('/dev-api/story/list', (req, res) => {
  const items = require('./data/story.js')
  return res.json({ code: 20000, data: {
    total: items.length,
    items: items
  }})
})

app.get('/dev-api/story/:id', (req, res) => {
  const id = req.params.id - 1
  const items = require('./data/story.js')
  return res.json({ code: 20000, data: items[id] })
})

// chatgpt 使用
const axios = require('axios')
app.post('/dev-api/gpt-init', async(req, res) => {
  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': '你是一位富有創意的國小五年級英文老師 目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式'
        },
        {
          'role': 'user',
          'content': '目標：產生一篇包含學習內容及符合小學五學生程度的短篇英語寓言故事，故事要有趣生動能引起小朋友閱讀興趣，故事內容要有意義，字數不要太多，約100字，句子不要出現複合句，用字不能太過困難，故事整體時態以現在簡單式呈現。 對象：國小五年級學生 學生程度：詞彙量約300字，學過現在式，還沒學過過去式 學習內容： park, library, hospital, supermarket, bookstore, tea shop, post office, zoo, Where are you going? I’m going to the _______. Where’s the ________? It’s on ____ Road. It’s next to the zoo.'
        }
      ]
    }
  }

  try {
    const response = await axios(config)
    // console.log(response.data)
    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error)
    res.status(500).send('Unable to fetch data from external API.')
  }
})

app.post('/dev-api/gpt-init2', async(req, res) => {
  const { story } = req.body
  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': `您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確。讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下三點為主軸。並且每次只能有一個問題以英文詢問，並且告訴我你選擇哪一個:1. 真實性問題（表層理解的問題）：如問what、when、where、how和who等事實性問題。2. 比較及對照文章訊息（推論的問題）：如問「which one is true/false」3. 整合分析類問題（深層理解的問題）：如問「why」等問題。規則: 1.開始直接就詢問小學生第一個跟故事有關的內容了2.在整個對話中，真實性問題至少要問過兩次，比較或整合一次，你直接選擇最合適的，不需要讓小朋友知道，例如:用'(真實)'呈現在問號後面3.一次只能問一個問題，一次只能問一個問題4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以以完整回答提示學生以幫助確定答案。7. 學生看不懂題目或故事可以以中文提示學生，但不要直接給予答案。`
        },
        story
      ]
    }
  }

  try {
    const response = await axios(config)
    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error)
    res.status(500).send('Unable to fetch data from external API.')
  }
})

app.post('/dev-api/gpt-message', async(req, res) => {
  const { historyItems } = req.body
  const config = {
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': `您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確。讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下三點為主軸。並且每次只能有一個問題以英文詢問，並且告訴我你選擇哪一個:1. 真實性問題（表層理解的問題）：如問what、when、where、how和who等事實性問題。2. 比較及對照文章訊息（推論的問題）：如問「which one is true/false」3. 整合分析類問題（深層理解的問題）：如問「why」等問題。規則: 1.開始直接就詢問小學生第一個跟故事有關的內容了2.在整個對話中，真實性問題至少要問過兩次，比較或整合一次，你直接選擇最合適的，不需要讓小朋友知道，例如:用'(真實)'呈現在問號後面3.一次只能問一個問題，一次只能問一個問題4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以以完整回答提示學生以幫助確定答案。7. 學生看不懂題目或故事可以以中文提示學生，但不要直接給予答案。8. 給予提示後要詢問學生是否理解，學生還是不懂的話請換個方式再次說明。學生了解後再針對故事用英文提出新問題`
        }
      ]
    }
  }
  historyItems.map((item) => {
    // config.data.messages.push({
    //   'role': 'system',
    //   'content': `請在結尾給一個隨意的表情符號, 當問題回答結束, 且學生回答了解, 繼續針對文章用英文問新的英文問題`
    // })
    config.data.messages.push(item)
  })
  try {
    const response = await axios(config)
    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error)
    res.status(500).send('Unable to fetch data from external API.')
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to my simple Express API!')
})

// GET 路由，返回 JSON 數據
app.get('/data', (req, res) => {
  res.json({ id: 1, name: 'John Doe', message: 'Hello from the server!' })
})

// 啟動服務器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
