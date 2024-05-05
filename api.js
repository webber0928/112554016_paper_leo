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

// DB 使用
const { User, Story, Chatbot, Message } = require('./models')

// user 使用
const users = require('./data/users.js')

const API_KEY = require('./apiKey.js').API_KEY
app.post('/dev-api/user/login', async(req, res) => {
  const { username } = req.body

  const user = await User.findOne({
    where: {
      user_no: username,
      deleted_at: null
    }
  })

  if (!user) {
    return res.json({
      code: 60204,
      message: '[Error] 找不到使用者'
    })
  }

  const token = {
    ...user,
    token: user.role_id === 1 ? 'editor-token' : 'admin-token',
    username
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

app.get('/dev-api/story/list', async(req, res) => {
  const items = await Story.findAll({
    where: {
      deleted_at: null
    }
  })
  return res.json({ code: 20000, data: {
    total: items.length,
    items: items
  }})
})

app.post('/dev-api/story', async(req, res) => {
  const { title, content } = req.body
  try {
    await Story.create({
      title,
      content
    })
    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
})

app.put('/dev-api/story/:id', async(req, res) => {
  const { title, content } = req.body
  try {
    const item = await Story.findOne({
      where: {
        id: req.params.id,
        deleted_at: null
      }
    })

    item.set('title', title)
    item.set('content', content)
    await item.save()

    return res.json({ code: 20000, data: {}})
  } catch (error) {
    return res.json({
      code: 60203,
      message: `[Error] ${error.message}`
    })
  }
})

app.get('/dev-api/story/:id', async(req, res) => {
  const item = await Story.findOne({
    where: {
      id: req.params.id,
      deleted_at: null
    }
  })
  return res.json({ code: 20000, data: item })
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
  try {
    const { message, username, storyId } = req.body
    const chatbot = await Chatbot.findOne({
      where: {
        type: 'questionPrompt',
        deleted_at: null
      }
    })
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: chatbot.prompt
        },
        message
      ]
    }
    const config = {
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      data
    }
    const response = await axios(config)

    const user = await User.findOne({
      where: {
        user_no: username,
        deleted_at: null
      }
    })
    const firstData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      message: JSON.stringify(data.messages[0])
    }
    await Message.create(firstData)

    const secondData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      message: JSON.stringify(data.messages[1])
    }
    await Message.create(secondData)

    const thirdData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      message: JSON.stringify({
        role: response.data.choices[0].message.role,
        content: response.data.choices[0].message.content
      })
    }
    await Message.create(thirdData)

    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error.message)
    res.status(500).send('Unable to fetch data from external API.')
  }
})

app.post('/dev-api/gpt-message', async(req, res) => {
  try {
    const { messages, username, storyId } = req.body
    const chatbot = await Chatbot.findOne({
      where: {
        type: 'questionPrompt',
        deleted_at: null
      }
    })
    const config = {
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: chatbot.prompt
          }
        ]
      }
    }
    messages.map((item) => {
      // config.data.messages.push({
      //   'role': 'system',
      //   'content': `請在結尾給一個隨意的表情符號, 當問題回答結束, 且學生回答了解, 繼續針對文章用英文問新的英文問題`
      // })
      config.data.messages.push(item)
    })
    const response = await axios(config)
    const user = await User.findOne({
      where: {
        user_no: username,
        deleted_at: null
      }
    })
    const firstData = {
      user: user.id,
      story_id: storyId,
      isBot: 0,
      message: JSON.stringify(messages.pop())
    }
    await Message.create(firstData)

    const secondData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      message: JSON.stringify({
        role: response.data.choices[0].message.role,
        content: response.data.choices[0].message.content
      })
    }
    await Message.create(secondData)

    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error.message)
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
