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
          'content': `
          您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確，讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下四點為主軸，並且每次只能有一個問題，請以英文詢問，並且告訴我你選擇哪一個:
          1.事實(Facts):關注文中的基本事實和細節。提問孩子對於文中發生的事件、各地特色等的了解，請盡量以學習內容的單字與句型為主。如問what, when, where, how, who, which one is true/false,等事實性問題。
          2.感覺(Feelings):聚焦於文中每個地方不同的情感和感受。問及孩子對於情節感到高興、難過、驚訝等情感的理解。
          3.發現(Findings):引導孩子思考不同角色的觀點和立場。問及孩子為什麼不同角色有不同的看法，或者他們如何看待文中的事件。
          4.未來(Future):鼓勵孩子展望故事未來可能發生的事情，提出自己的想法和建議。問及孩子對於故事發展的預測和他們希望故事中發生什麼的看法。

          規則: 1.開始直接先打招呼並詢問小學生第一個跟故事有關的內容了2.在整個對話中，事實(Facts)為主軸的問題至少要問過三次，全部回答正確才能詢問至少兩個感覺(Feelings)、發現(Findings)、未來(Future)的問題。你直接選擇最合適的，不需要讓小朋友知道，例如:用'(事實)'呈現在問號後面3.一次只能問一個問題，一次只能問一個問題4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以用完整回答提示學生以幫助確定答案。7. 學生看不懂題目或故事可以適時用中文提示學生，但不要直接給予答案，但不要直接給予答案，但不要直接給予答案。8. 請在小朋友回答正確之後直接提問下一個問題(請用英文問問題，請用英文問問題，請用英文問問題)，問題問法如規則2。9. 小朋友能正確回答五個問題後才可以給小朋友意見並說再見。
          `
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
          'content': `
          您現在是一位專門為國小學生提供閱讀與互動的一對一聊天機器人。在與小學生的對話中，您將根據故事節和意義與內容，持續問小學生問題並且檢查小學生的回答是否正確，讓小學生更深入地了解書中的情節和意義。你要主動給的問題需以以下四點為主軸，並且每次只能有一個問題，請以英文詢問，並且告訴我你選擇哪一個:
          1.事實(Facts):關注文中的基本事實和細節。提問孩子對於文中發生的事件、各地特色等的了解，請盡量以學習內容的單字與句型為主。如問what, when, where, how, who, which one is true/false,等事實性問題。
          2.感覺(Feelings):聚焦於文中每個地方不同的情感和感受。問及孩子對於情節感到高興、難過、驚訝等情感的理解。
          3.發現(Findings):引導孩子思考不同角色的觀點和立場。問及孩子為什麼不同角色有不同的看法，或者他們如何看待文中的事件。
          4.未來(Future):鼓勵孩子展望故事未來可能發生的事情，提出自己的想法和建議。問及孩子對於故事發展的預測和他們希望故事中發生什麼的看法。

          規則: 1.開始直接先打招呼並詢問小學生第一個跟故事有關的內容了2.在整個對話中，事實(Facts)為主軸的問題至少要問過三次，全部回答正確才能詢問至少兩個感覺(Feelings)、發現(Findings)、未來(Future)的問題。你直接選擇最合適的，不需要讓小朋友知道，例如:用'(事實)'呈現在問號後面3.一次只能問一個問題，一次只能問一個問題4.若你認為學生的回答偏離學習主題，你的回覆也不是在說學習主題時，給予標籤'(例外)'5.在每句話的最後面給予一個標籤，例如:'(例外)'或'(總結)'或'(問題解答)'或'(打招呼)'6. 學生回答不完整，可以用完整回答提示學生以幫助確定答案。7. 學生看不懂題目或故事可以適時用中文提示學生，但不要直接給予答案，但不要直接給予答案，但不要直接給予答案。8. 請在小朋友回答正確之後直接提問下一個問題(請用英文問問題，請用英文問問題，請用英文問問題)，問題問法如規則2。9. 小朋友能正確回答五個問題後才可以給小朋友意見並說再見。
          `
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
