
const axios = require('axios')
const API_KEY = require('../../../apiKey.js').API_KEY
const moment = require('moment-timezone')
const { Chatbot, User, Message } = require('../../models')

module.exports = async(req, res) => {
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
        // model: 'text-embedding-3-small',
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: chatbot.prompt
          }
        ]
        // max_tokens: 20
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
      type: 'user',
      message: JSON.stringify(messages.pop()),
      execute_date: moment().tz('Asia/Taipei').format('YYYYMMDD')
    }
    await Message.create(firstData)

    const secondData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      type: response.data.choices[0].message.role,
      message: JSON.stringify({
        role: response.data.choices[0].message.role,
        content: response.data.choices[0].message.content
      }),
      execute_date: moment().tz('Asia/Taipei').format('YYYYMMDD')
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
}

