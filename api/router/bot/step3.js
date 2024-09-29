
const axios = require('axios')
const API_KEY = require('../../../apiKey.js').API_KEY
const moment = require('moment-timezone')
const { Tutorial, User, Message } = require('../../models')

module.exports = async(req, res) => {
  try {
    const { message, username, storyId } = req.body
    console.log('L10', API_KEY, req.body)
    const tutorial = await Tutorial.findOne({
      where: {
        id: storyId,
        deleted_at: null
      }
    })
    const data = {
      // model: 'text-embedding-3-small',
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: tutorial.prompt
        }
        // message
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
      tutorial_id: storyId,
      isBot: 1,
      type: data.messages[0].role,
      message: JSON.stringify(data.messages[0]),
      execute_date: moment().tz('Asia/Taipei').format('YYYYMMDD')
    }
    // await Message.create(firstData)

    return res.json({
      code: 20000, data: response.data
    })
  } catch (error) {
    console.log('L22', error)
    // 處理錯誤
    console.error('Error fetching external API:', error.message)
    res.status(500).send('Unable to fetch data from external API.')
  }
}

