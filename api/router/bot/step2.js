
const axios = require('axios')
const API_KEY = require('../../../apiKey.js').API_KEY
const moment = require('moment-timezone')
const { Chatbot, User, Message } = require('../../models')

module.exports = async(req, res) => {
  try {
    const { message, username, storyId } = req.body
    const chatbot = await Chatbot.findOne({
      where: {
        type: 'questionPrompt',
        deleted_at: null
      }
    })
    const data = {
      // model: 'text-embedding-3-small',
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: chatbot.prompt
        },
        message
      ]
      // max_tokens: 50
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
      type: data.messages[0].role,
      message: JSON.stringify(data.messages[0]),
      execute_date: moment().tz('Asia/Taipei').format('YYYYMMDD')
    }
    await Message.create(firstData)

    const secondData = {
      user: user.id,
      story_id: storyId,
      isBot: 1,
      type: 'story',
      message: JSON.stringify(data.messages[1]),
      execute_date: moment().tz('Asia/Taipei').format('YYYYMMDD')
    }
    await Message.create(secondData)

    const thirdData = {
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
    await Message.create(thirdData)

    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    // 處理錯誤
    console.error('Error fetching external API:', error.message)
    res.status(500).send('Unable to fetch data from external API.')
  }
}

